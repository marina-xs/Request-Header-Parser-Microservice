// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});
//{"ipaddress":"112.1.46.79","language":"en-US,en;q=0.9","software":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"}
app.get('/api/whoami', function (req, res) {
  console.log(req.headers['x-forwarded-for']);
  //undefined
  //Reason:When a client makes a request to a server, it sends along various headers that contain information about the request. One of these headers is the X-Forwarded-For header, which contains the full IP address of the client that made the request.
  //However, not all requests will have this header. In the case of the code block your colleague provided, the X-Forwarded-For header was not present in the request, which is why it returned undefined when they tried to log it.
  console.log(req.socket.remoteAddress);
  //::1(same as req.ip, which means hat the server is only listening on the IPv6 loopback address. To fix this, you can modify the listen function to listen on all available network interfaces by passing 0.0.0.0 as the hostname:)
  res.json({ipaddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress, 
            language: req.headers['accept-language'], 
            software: req.headers['user-agent']});
});

// listen for requests :)
// add '0.0.0.0' here so the server is listening on all available network interfaces, not only IPv6, so I can be able to get the complete ip address
var listener = app.listen(process.env.PORT || 3000, '0.0.0.0', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
