
var express = require('express');
var app = express ();

var zombify = require('./zombieTranslator').zombify;
var unzombify = require('./zombieTranslator').unzombify;

var portNumber = 7000;

//
// Logging...
//
app.use(function(req, res, next) {
  console.log((new Date()).toString() + " " + req.method + " " + req.url);
  showRequestProperties(req);
  next();
});

app.get('/zombify', function(req, res, next) {
  showAllProperties('/zombofy:', res);
  var zombified = zombify("Hello World!!!");
  res.send(zombified);
});

app.get('/unzombify', function(req, res, next) {
  showAllProperties('/unzombify:', res);
  var unzombified = unzombify("HrrllrrrRr wRwrrrRrRRld!!!");
  res.send(unzombified);
});

app.listen(portNumber);

function messageRequestProperties(req) {
  var message = "Request properties....\n";

  message += " [url]   : " + req["url"] + "\n";
  message += " [method]: " + req["method"] + "\n";
  message += " [headers]: " + "\n";
  var headers = req["headers"];
  for (var key in headers) {
    var value = headers[key];
    message += "    [headers." + key + "] : " + value + "\n";
  }
  return message;
}

function showRequestProperties(req) {
  console.log(messageRequestProperties(req));
}

function showAllProperties(title, obj) {
  console.log(title + "[" + obj + "]");
  console.log(JSON.stringify(obj), null, '\t');
}
