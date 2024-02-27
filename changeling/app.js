const fs = require('node:fs');

const changelog_path = 'changelog/co-re_changelog.json';

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

// for proc add
let addLine = () => {};
let addChange = () => {};
// for proc remove
let selectLine = () => {};
let removeLine = () => {};
// for proc commit
let 
// for proc uncommit

function main() {
  if (process.argv[2] && process.argv[2] === '-a') {
    console.log(process.argv[0] + "\n" + process.argv[1]);
    let print = (data) => { console.log(data); };
    openChangelog_paramPass(print);
  }
}

if (require.main === module) {
  main();
}