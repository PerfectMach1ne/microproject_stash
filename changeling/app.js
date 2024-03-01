import { openSync, readFileSync, closeSync, copyFileSync } from 'node:fs';

const changelog_path = 'changelog/co-re_changelog.json';
const backup_path = 'changelog/co-re_changelog_BACKUP.json';

// https://stackoverflow.com/questions/34980249/returning-undefined-from-readfile
//
// readFile is executed asynchronously, so data can only be accessed inside the callback
// function, if you want it to be synchronous, you should use readFileSync
//
///////////////////////////////////////////////////////////////////////////
// Opens the changelog file and returns it as a JSON object.
///////////////////////////////////////////////////////////////////////////
function _openChangelog() {
  console.log("[app.js] Opening the changelog file...");
  let file = undefined;

  try {
    file = openSync(changelog_path);
    console.log("[app.js] Changelog file opened successfully!");
  } catch (err) {
    console.error("[app.js] An error occurred while attempting to open the changelog file!\n", err);
  }

  try {
    let json_data = readFileSync(file, 'utf-8');
    json_data = JSON.parse(json_data);

    console.log("[app.js] Closing the changelog file and returning data...");
    try {
      closeSync(file);
    } catch (err) {
      console.error("[app.js] An error occurred while attempting to close the changelog file!\n", err);
    }
    
    return json_data;
  } catch (err) {
    console.error("[app.js] An error occurred while attempting to read the changelog file!\n", err);
  }
}

///////////////////////////////////////////////////////////////////////////
// Backup the changelog file.
///////////////////////////////////////////////////////////////////////////
function _backupChangelog() {
  try {
    copyFileSync(changelog_path, backup_path);
    console.log("[app.js] Successfully created a changelog backup!");
  } catch (err) {
    console.error("[app.js] An error occurred while attemping to create a changelog backup!");
  }
}

///////////////////////////////////////////////////////////////////////////
// Find the current P2E stage's list of changes in the changelog JSON object
// passed as an argument, then return it.
///////////////////////////////////////////////////////////////////////////
function getCurrentStageChanges(changelog) {
  // Fetch current P2E stage from the changelog JSON object.
  let current_stage = changelog.current_stage;
  let current_stage_changes;

  // Iterate through the array of stages to find the one corresponding to the "current_stage" property:
  for (let i = 0; i < changelog.dev_stages.length; i++) {
    if (changelog.dev_stages[i].stage === current_stage) {
      // Set return value variable to the array of changes of the corresponding stage.
      current_stage_changes = changelog.dev_stages[i].changes;
    }
  }
 
  return current_stage_changes;
}

///////////////////////////////////////////////////////////////////////////
// Fetch and return the head change from the id and change list passed as arguments.
///////////////////////////////////////////////////////////////////////////
function getHead(head_id, changes) {
  for (let i = 0; i < changes.length; i++) {
    if (changes[i].change_id === head_id) {
      return changes[i];
    }
  }
}

///////////////////////////////////////////////////////////////////////////
// Fetch and return the hat change from the id and change list passed as arguments.
///////////////////////////////////////////////////////////////////////////
function getHat(hat_id, changes) {
  for (let i = 0; i < changes.length; i++) {
    if (changes[i].change_id === hat_id) {
      return changes[i];
    }
  }
}

// for proc add
function addLine() {
  let todo = undefined;
}

function addChange() {
  let todo = undefined;
}

// for proc list
function listLines(head_change, return_mode = false) {
  if (!return_mode || return_mode === undefined) {
    console.log("Version: " + head_change.version + "#" + String(head_change.build).padStart(4, '0'));
    console.log("Date: " + head_change.date);
    for (let i = 0; i < head_change.lines.length; i++) {
      let single_change = head_change.lines[i];
      console.log(( !isNaN(Number(single_change.prefix)) ?
                  ' '.repeat(2 * (Number(single_change.prefix) - 1)) + '--' :
                  single_change.prefix )
                  + ' ' + single_change.content);
    }
  } else {
    let str_line_list = [];
    
    for (let i = 0; i < head_change.lines.length; i++) {
      let single_change = head_change.lines[i];
      str_line_list.push(( !isNaN(Number(single_change.prefix)) ?
                  ' '.repeat(2 * (Number(single_change.prefix) - 1)) + '--' :
                  single_change.prefix )
                  + ' ' + single_change.content);
    }

    return str_line_list;
  }
}

// for proc remove
function selectLine() {
  let todo = undefined;
}

function removeLine() {
  let todo = undefined;
}

// for proc commit
// for proc uncommit
function updateHeadHat(changelog, head, hat, uncommit_mode = false) {
  console.log("ToDo: updateHeadHat()");
}

/// Methods for converting JSON data to HTML tags could be put in two static classes.
/// ...or, I suppose, I could learn about ES6 modules? idk

function main() {
  // Fetch all the important stuff from JSON object into memory.
  let changelog = _openChangelog();
  let current_changes = getCurrentStageChanges(changelog);
  let head_change = getHead(changelog.head_change, current_changes);
  let hat_change = getHat(changelog.hat_change, current_changes);
  
  if (process.argv[2] === undefined) {
    console.log("ToDo noparams");
  } else if (process.argv[2] === '--backup') {
    _backupChangelog();
  } else if (process.argv[2] === '--latest-head') {
    console.log(head_change);
  } else if (process.argv[2] === '--latest-hat') {
    console.log(hat_change);
  } else if (process.argv[2] === '--list') {
    listLines(head_change);
    console.log(listLines(head_change, true));
  } else if (process.argv[2] === '--add') {
    console.log("ToDo");
  } else if (process.argv[2] === '--remove') {
    console.log("ToDo");
  } else if (process.argv[2] === '--commit') {
    console.log("ToDo");
  } else if (process.argv[2] === '--uncommit') {
    console.log("ToDo");
  } else if (process.argv[2] === '--push') {
    console.log("ToDo");
  } else if (process.argv[2] === '--htmlify') {
    console.log("ToDo");
  }
}

main();
