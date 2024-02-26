const fs = require('node:fs');

const changelog_path = 'changeling/changelog/co-re_changelog.json';

var json_data = undefined;

function openChangelog() {
  fs.readFile(changelog_path, 'utf8', (err, file) => {
    try {
      json_data = JSON.parse(file);
      console.log(json_data);
    } catch (err) {
      console.error("An error occurred while attempting to read the changelog file!", err);
    }
  });
}

openChangelog();