V21.11 — EMPTY WEEK DELETION
Deleting the last week leaves the week list empty instead of recreating a blank week. Edit and delete confirmations appear inside the selected week card.

V21.10 — LIVE CALENDAR BADGE
Week headers show a themed calendar badge with the actual month and day from the week date. Blank or invalid dates show DATE / —.

V21.9 — AUTOMATIC SESSION DATE
Starting a session stamps the device’s local date, fills blank week dates, and preserves the start date in session history. Existing week labels stay unchanged.

V21.8 — SESSION CARD THEME
Forest green, ivory and lime session cards with court/check icons and keyboard-accessible buttons.

V21.6 — RESET FIX
Reset uses an in-app typed confirmation and clears weeks, attendance, penalties, session progress, and correction history. Points-only reset keeps players and their ladders; both options keep scoring settings.

V21.5 — SIMPLER BACKUP SCREEN
Backup now has the last-backup date and Download / Share / Restore actions. Coordinator data and backup-code recovery are in expandable sections. Public standings tools are on Ladder. Install, Lock and expandable Reset tools are in Settings. Share backup uses native file sharing when supported, otherwise downloads the file. Existing scoring, corrections, and backup formats are unchanged.

V21.4 — MATCHING APP ICON
New forest-green, electric-lime and ivory icon for the browser tab, coordinator lock screen, iPhone home screen and Android app installation. Original pickleball/ladder symbol retained. Versioned icon URLs and a fresh service-worker cache included. App logic and scoring preferences are unchanged.

Upload the COMPLETE package to update installed-app icons; replacing only index.html cannot update manifest icon assets. Existing installations may retain their previous home-screen icon until the device refreshes its app metadata.

V21.3 — MEN’S AND WOMEN’S LADDERS
The former Upper group is now Men’s Ladder; the former Lower group is now Women’s Ladder. Internal group keys are retained to preserve existing points, history and correction records. No players were automatically reassigned. Use Players > Change ladder to move anyone whose current group does not match. Labels and skill-rating references were updated throughout the app and public standings exports. Scoring settings are unchanged.

V21.2 — DECIMAL SETTINGS FIX
Base-point fields and court multipliers accept decimal input and show decimal keyboards on phones. Typing does not rebuild the settings screen. Valid values save immediately, including zero base points. Blank/incomplete or out-of-range entries revert to the last valid value when leaving the field. Scoring retains its existing one-decimal result rounding. Defaults and saved session rules are unchanged.

SCORING DEFAULTS — v21.1
Show-up bonus: +20
Per win: +12 before court multiplier
Per loss: -4 before court multiplier
Miss both sessions: -20
Court 1: 1.3x; Court 2: 1.15x; Court 3: 1x; Court 4 and lower: 0.9x.
All settings remain editable. Existing saved preferences and recorded-session scoring snapshots are preserved; defaults apply on new installations.

LEVELUP V21 — COURT CLUB

WHAT CHANGED
1. Mobile scoring: compact header during sessions, larger numeric score fields, stable typing focus, next-field keyboard navigation, and a bottom action bar. Existing court, scoresheet, rotation and player-management workflows remain available.
3. Session corrections and undo: new completed sessions retain both rounds of scores and their scoring rules. Open a completed session in Events and choose Edit saved scores or Undo session. Cancel discards a correction draft. Saving a correction replays later point operations in chronological order, including zero-point floors and later penalties/manual adjustments. Existing court assignments stay as played; correcting round 1 does not retroactively rotate round 2.
6. Public standings: Generate standings.html and Send standings.html now use the Court Club design with embedded photo/font, both ladders, player statistics, print support, and movement indicators based on the before/after ranks of the latest recorded session for each ladder. Missing movement history is shown explicitly.

EDIT AND UNDO
- Finish or cancel an active session before editing or undoing another one.
- History includes Session change history with previous totals and score summaries.
- Restore session brings back an undone session if its original slot is still free.
- Undo also reverses new recorded absence penalties for that week/ladder. After restoring, check attendance and reapply the penalty separately if needed.
- Manual relative changes (+10/-5) replay as relative changes. Explicit point totals remain absolute targets.
- Saved scoresheets reopen with their match scores. Editing individual totals clears that court's saved sheet so outdated match scores cannot overwrite the manual change.
- A removed participant must be restored before editing/restoring their session.

EXISTING HISTORY
Older sessions do not contain full original scores or exact point baselines. They remain visible, but cannot safely use automatic edit/undo. Use the existing Players > Edit points action for a documented adjustment. New session records use internal identifiers to keep corrections attached to the same participants. The app's broader legacy attendance representation remains unchanged.

INSTALL
Back up through your current app first. Deploy the contents of this ZIP to the SAME existing site address, replacing index.html, sw.js and manifest.json. Keep the supplied icons. The app still uses the original storage keys, passcode and cloud destination. No live site has been changed or published by this update.
Opening the HTML at a different address does not automatically carry over that site's browser data; use Backup/Restore to transfer it.
Keep a backup before downgrading to an earlier app version, which does not understand the new correction records.

VERIFICATION
Automated checks cover v20 scoring parity, an eight-player/two-round session, duplicate completion, undo/restore, older-session correction with later replay, point floors, penalties, absolute/relative adjustments, renamed/reordered players, backup recovery, scoresheet preservation, fixed scoring rules and public-export escaping/rendering with an isolated DOM model.
Phone appearance and keyboard behavior have not been verified in a real browser in this environment.

ASSETS
Original icons retained. Header photo and embedded font carried over from the Court Club design. Rubik Bold Italic is distributed under SIL Open Font License; see FONT-LICENSE.txt.
