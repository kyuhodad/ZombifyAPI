
var fs = require('fs');

var express = require('express');
var app = express ();
var portNumber = 7000;

var markdown = require( "markdown" ).markdown;

var zombify = require('./zombieTranslator').zombify;
var unzombify = require('./zombieTranslator').unzombify;
var maxStringLength = 1000;

//var readmeFS = fs.createReadStream('README.md');
var readmeStr = fs.readFileSync('./README.md').toString ();
var apiDocHTML = markdown.toHTML(readmeStr.substr(readmeStr.search('## ZombifyAPI')));

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
  res.send(apiDocHTML);
  logResponse (res);
});

// zombify route
app.get('/zombify', function(req, res, next) {
  if (!translate ('/zombify', req.query.q, zombify, res)) {
    // If it has not been handled, keep going to next.
    next();
  }
});

// unzombify route
app.get('/unzombify', function(req, res, next) {
  if (!translate ('/unzombify', req.query.q, unzombify, res)) {
    // If it has not been handled, keep going to next.
    next();
  }
});

// Handles route error
app.use(function(req, res, next) {
  res.status(404);
  res.json({"status": 404, "message": "Route not found"});
  logResponse (res);
});

// Listen.....
app.listen(portNumber, function () {
  console.log('ZombifyAPI Server is listening on port ' + portNumber + '.');
});

// Translating function using given translator
function translate(apiName, str, tranlator, res) {
  var hasHandled = handleEmptyString(apiName, str, res);
  if (!hasHandled) {
    hasHandled = handleStringLengthLimit(str, res);
  }

  if (!hasHandled) {
    var translated = tranlator(str);
    res.json({result: translated});
    logResponse (res);
    hasHandled = true;
  }

  return hasHandled;
}

// Handles the limit of requested string length...
function handleEmptyString (apiName, str, res) {
  var hasHandled = false;
  if ((str === undefined) || (str.length === 0)) {
    res.json({
      "result": "",
      "message": "Empty string requested. Use '" + apiName + "?q=string to translate' format."
    });
    logResponse (res);
    hasHandled = true;
  }
  return hasHandled;
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
      "\n[Request: " + new Date().toISOString() + "]\n  " +
      req.method + " on [" + req.path + "]";

  var hasParam = false;
  var params = " (";
  for(var key in req.query) {
    hasParam = true;
    params += '"' + key + '": "' + req.query[key] + '"';
  }
  if (hasParam) {
    params += ')';
    logMessage += params;
  }
  logMessage += "\n  user-agent: " + req.headers['user-agent'];

  console.log(logMessage);
}

// Logging response data
function logResponse(res) {
  console.log("[Response: " + new Date().toISOString() + "]  Status Code: " + res.statusCode);
}
