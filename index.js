// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:id?', function (req, res) {
  if(req.params.id) {
    let inp = req.params.id;
    if(!inp.includes('-')) {
      inp = parseInt(inp);
      timeArg = true;
      let dt = new Date(inp);
      res.json({unix: dt.getTime(), utc: dt.toUTCString()});
    }
    let args = inp.split('-');
    let date_string = args[0];
    let month = args[1];
    if(month.length == 1) month = '0'+month;
    date_string = date_string + '-' + month;
    if(args[2] != undefined) {
      if(args[2].length == 1) args[2] = '0'+args[2];
      date_string = date_string + '-' + args[2];
    }
    let dt = new Date(date_string);
    if(dt == "Invalid Date") res.json({error: "Invalid Date"});
    else res.json({unix: dt.getTime(), utc: dt.toUTCString()});
  } else {
    const dt = new Date();
    res.json({unix: dt.getTime(), utc: dt.toUTCString()});
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
