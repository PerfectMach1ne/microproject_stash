const fs = require('node:fs');

const changelog_path = 'changelog/co-re_changelog.json';
const backup_path = 'changelog/co-re_changelog_BACKUP.json';

// https://stackoverflow.com/questions/34980249/returning-undefined-from-readfile
//
// readFile is executed asynchronously, so data can only be accessed inside the callback
// function, if you want it to be synchronous, you should use readFileSync
function openChangelog_paramPass(fun) {
  fs.readFile(changelog_path, 'utf8', (err, file) => {
    try {
      let json_data = JSON.parse(file);
      fun(json_data);
    } catch (err) {
      console.error("An error occurred while attempting to read the changelog file!\n", err);
    }
  });
}

function backupChangelog() {
  fs.copyFile(changelog_path, backup_path, (err) => {
    if (err) throw err;
    console.log("Backup of 'co-re_changelog.json' successfully created!");
  });
}

let getHead = () => {};
let getHat = () => {};
// for proc add
let addLine = () => {};
let addChange = () => {};
// for proc remove
let selectLine = () => {};
let removeLine = () => {};
// for proc commit
let updateHeadHat = () => {};
// for proc uncommit

function main() {
  if (process.argv[2] && process.argv[2] === '-a') {
    console.log(process.argv[0] + "\n" + process.argv[1]);
    let print = (data) => { console.log(data); };
    openChangelog_paramPass(print);
  } else if (process.argv[2] && process.argv[2] === '--backup') {
    backupChangelog();
  }
}

if (require.main === module) {
  main();
}