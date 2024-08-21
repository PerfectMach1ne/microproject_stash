var express = require('express')
var cors = require('cors')
var app = express()

var corsOptions = {
  origin: 'http://127.0.0.1:5500/front/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.get('/', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})

app.listen(3057, function () {
  console.log('CORS-enabled web server listening on port 3057')
})
