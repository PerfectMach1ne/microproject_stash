const express = require('express');
var app = express();

const port = 3057;

app.get('/', (req, res) => {
  res.send('moooom, i made a pomodoro timer gacha game of life!')
});

app.listen(port, () => {
  console.log(`PoGamochodoro Express.js backend listening on port ${port}`);
});