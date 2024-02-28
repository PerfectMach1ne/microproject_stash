import { readFileSync, copyFileSync } from 'node:fs';

const changelog_path = 'changelog/co-re_changelog.json';
const backup_path = 'changelog/co-re_changelog_BACKUP.json';

// https://stackoverflow.com/questions/34980249/returning-undefined-from-readfile
//
// readFile is executed asynchronously, so data can only be accessed inside the callback
// function, if you want it to be synchronous, you should use readFileSync
function _openChangelog() {
  try {
    let json_data = readFileSync(changelog_path, 'utf-8');
    json_data = JSON.parse(json_data);
    return json_data;
  } catch (err) {
    console.error("An error occurred while attempting to read the changelog file!\n", err);
  }
}

function _backupChangelog() {
  try {
    copyFileSync(changelog_path, backup_path);
  } catch (err) {
    console.error("An error occurred while attemping to create a changelog backup!");
  }
}

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

function getHead(head_id, changes) {
  for (let i = 0; i < changes.length; i++) {
    if (changes[i].change_id === head_id) {
      return changes[i];
    }
  }
}

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
// for proc remove
function selectLine() {
  let todo = undefined;
}
function removeLine() {
  let todo = undefined;
}
// for proc commit
function updateHeadHat() {
  let todo = undefined;
}
// for proc uncommit

function main() {
  let changelog = _openChangelog();
  let current_changes = getCurrentStageChanges(changelog);
  let head_change = getHead(changelog.head_change, current_changes);
  let hat_change = getHat(changelog.hat_change, current_changes);
  if (process.argv[2] && process.argv[2] === '-a') {
    // console.log(changelog.dev_stages);
    console.log(current_changes);
    console.log(head_change);
    console.log(hat_change);
  } else if (process.argv[2] && process.argv[2] === '--backup') {
    _backupChangelog();
  }
}

main();