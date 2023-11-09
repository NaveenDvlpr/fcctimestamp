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
    if(!inp.includes('-')) inp = parseInt(inp);
    let dt = new Date(inp);
    if(dt == "Invalid Date") res.json({error: "Invalid Date"});
    else {
      let args = inp.split('-');
      if(args[1] == "01" || args[1] == "01" || args[1] == "02" || args[1] == "03" || args[1] == "04" || args[1] == "05" || args[1] == "06" || args[1] == "07" || args[1] == "08" || args[1] == "09" || args[1] == "10" || args[1] == "11" || args[1] == "12")
      res.json({unix: dt.getTime(), utc: dt.toUTCString()});
      else {
        dt = new Date(dt.getTime() + 19800000);
        res.json({unix: dt.getTime(), utc: dt.toUTCString()});
      }
    }
  } else {
    const dt = new Date();
    res.json({unix: dt.getTime(), utc: dt.toUTCString()});
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
