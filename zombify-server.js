
var fs = require('fs');

var express = require('express');
var app = express ();
var portNumber = 7000;

var markdown = require( "markdown" ).markdown;

var zombify = require('./zombieTranslator').zombify;
var unzombify = require('./zombieTranslator').unzombify;
var maxStringLength = 10;

// Logging request...
app.use(function(req, res, next) {
  logRequest (req);
  next();
});

// Access controls
// TODO: Check if it needs... (With a simple app)
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// '/' route:
app.get('/', function(req, res, next) {
  // TODO: Need to send the translated mark-down file for API help.
  var apiDocument = "Zombify / Unzombify API document..."
  res.send(apiDocument);
  logResponse (res);
});

// zombify route
app.get('/zombify', function(req, res, next) {
  var str = req.query.q;
  if (str !== undefined) {
    translate (str, zombify, res);
    return;
  }
  next();
});

// unzombify route
app.get('/unzombify', function(req, res, next) {
  var str = req.query.q;
  if (str !== undefined) {
    translate (str, unzombify, res);
    return;
  }
  next();
});

// Handles route error
app.use(function(req, res, next) {
  res.status(404);
  res.json({"status": 404, "message": "Route not found"});
  logResponse (res);
});

// Listen.....
app.listen(portNumber);

// Translating function using given translator
function translate(str, tranlator, res) {
  if (!handleStringLengthLimit (str, res)) {
    var translated = tranlator(str);
    res.json({result: translated});
    logResponse (res);
  }
}

// Handles the limit of requested string length...
function handleStringLengthLimit (str, res) {
  var hasHandled = false;
  if (str.length > maxStringLength) {
    res.status(414);
    res.json({"status": 414, "message": "Requested string length is over the limit (" + maxStringLength + ")."});
    logResponse (res);
    hasHandled = true;
  }
  return hasHandled;
}

// Logging request data
function logRequest(req) {
  var logMessage =
      "[Request: " + new Date().toString() + "]\n  " +
      req.method + " on [" + req.path + "]\n";

  var params = "    with parameters: \n";
  for(var key in req.query) {
    params += '      "' + key + '": "' + req.query[key] + '"';
  }
  logMessage += params;
  logMessage += "\n  user-agent: " + req.headers['user-agent'];

  console.log(logMessage);
}

// Logging response data
function logResponse(res) {
  console.log("[Response]" + res.statusCode + " " + res.statusMessage);
}
