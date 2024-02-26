const fs = require('node:fs');

const changelog_path = 'changelog/co-re_changelog.json';

let json_data;

function openChangelog() {
  fs.readFile(changelog_path, 'utf8', (err, file) => {
    try {
      json_data = JSON.parse(file);
      console.log(json_data);
    } catch (err) {
      console.error("An error occurred while attempting to read the changelog file!\n", err);
    }
  });
}

openChangelog();

if (process.argv[2] && process.argv[2] === '-a') {
  console.log(process.argv[0] + "\n" + process.argv[1]);
}