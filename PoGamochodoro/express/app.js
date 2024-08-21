var path = require('path');
var express = require('express');
var cors = require('cors');
var logger = require('morgan');

var app = express();

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