const path = require('path');

const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const sqlite3 = require('sqlite3').verbose();

var app = express();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE baka (baka_type TEXT)');
  const statement = db.prepare('INSERT INTO baka VALUES (?)');

  for (let i = 0; i < 3; i++) {
    statement.run(`${i + 1}ple baka${'!'.repeat(3 * i)}`);
  }

  statement.finalize();

  db.each('SELECT rowid AS id, baka_type FROM baka', (err, row) => {
    console.log(`${row.id}: ${row.baka_type}`);
  })
});

const port = 3057;

app.use(logger('dev'));

var allowlist = ['http://127.0.0.1:5500/front/', 'http://127.0.0.1:5500/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.get('/', cors(corsOptionsDelegate), (req, res, next) => {
  res.json({msg: 'moooom, i made a pomodoro timer gacha game of life!!!!'})
});

app.listen(port, () => {
  console.log(`PoGamochodoro Express.js backend listening on port ${port}`);
});

db.close();