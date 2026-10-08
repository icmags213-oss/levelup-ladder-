/* LevelUp sync: persisted snapshots, optimistic revisions and idempotent retries. */
(function(root){
 const clone=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 class LevelUpSync {
  constructor({local,meta,read,write,persist,apply,status,id}){
   this.read=read;this.write=write;this.persist=persist;this.apply=apply;this.status=status;this.id=id;
   this.local=clone(local);this.meta=meta||{linked:false,revision:0,base:null,pending:null};this.remote=null;this.busy=false;this.conflict=false;
  }
  save(){this.persist(clone(this.meta),clone(this.local));}
  dirty(){return !same(this.local,this.meta.base);}
  edit(value){this.local=clone(value);this.save();this.status(this.meta.linked?'pending':'setup');}
  async accept(row){
   // Apply before acknowledging a remote revision, so a failed local write is retryable.
   await this.apply(clone(row.payload));this.local=clone(row.payload);
   this.meta={linked:true,revision:row.revision,base:clone(row.payload),pending:null};this.remote=row;this.conflict=false;this.save();this.status('synced');
  }
  async cycle(){
   if(this.busy)return;this.busy=true;
   try{
    if(this.conflict){this.status('conflict');return;}
    // A pending request may have succeeded even if the response was lost.
    if(this.meta.linked&&this.meta.pending){await this.sendPending();if(this.conflict)return;}
    const row=await this.read();this.remote=row;
    if(!this.meta.linked){this.status('setup');return;}
    if(row.revision!==this.meta.revision){
     if(this.dirty()){this.conflict=true;this.status('conflict');return;}
     if(!row.payload)throw Error('Shared ladder is not initialized');
     await this.accept(row);
    }
    if(this.dirty()){
     this.meta.pending={revision:this.meta.revision,id:this.id(),payload:clone(this.local)};this.save();await this.sendPending();
    }else this.status('synced');
   }catch(e){this.status(e.code==='42501'?'denied':e.code==='STORAGE'?'storage':'offline',e);}
   finally{this.busy=false;}
  }
  async sendPending(){
   const p=this.meta.pending;this.status('syncing');
   try{
    const row=await this.write(p);this.remote=row;
    this.meta.revision=row.revision;this.meta.base=clone(p.payload);this.meta.pending=null;this.save();
    this.status(this.dirty()?'pending':'synced');
   }catch(e){if(e.code==='40001'){this.remote=await this.read();this.conflict=true;this.status('conflict');}else throw e;}
  }
  async initialize(){
   if(this.busy)return;this.busy=true;
   try{const row=await this.read();this.remote=row;if(row.payload){this.status('setup');return;}
    this.meta={linked:true,revision:row.revision,base:null,pending:{revision:row.revision,id:this.id(),payload:clone(this.local)}};this.save();await this.sendPending();
   }catch(e){this.status('offline',e);}finally{this.busy=false;}
  }
  async useOnline(){
   if(this.busy)return;this.busy=true;
   try{const row=await this.read();if(!row.payload)throw Error('No online ladder yet');await this.accept(row);}
   catch(e){this.status('offline',e);}finally{this.busy=false;}
  }
 }
 root.LevelUpSync=LevelUpSync;if(typeof module!=='undefined')module.exports=LevelUpSync;
})(typeof globalThis!=='undefined'?globalThis:this);
