
( function () {
  var http = require('http');
  var url = require('url');

  var zombify = require('./zombieTranslator').zombify;
  var unzombify = require('./zombieTranslator').unzombify;

  var portNumber = 7070;

  // Create and start server.
  var server = http.createServer(handleRequest);
  server.listen (portNumber, function () {
    console.log('Zmobify server started and is listening on port ' + portNumber + '.');
  });

  // Request handler.
  function handleRequest (request, response) {
    showRequestProperties(request);

    var purl = url.parse(request.url, true);

    if (request.url === '/favicon.ico') {
      response.writeHead(200);
      response.end();
      return;
    }

    if (purl.pathname === '/zombify') {
      response.writeHead(200, {'Content-Type': 'application/json'});
      var zombified = zombify("Hello World!!!");
      var jsonOut = JSON.stringify({results: zombified}, null, '\t');
      response.write(jsonOut);
      response.end();
      return;
    }
    if (purl.pathname === '/unzombify') {
      response.writeHead(200, {'Content-Type': 'application/json'});
      var unzombified = unzombify("HrrllrrrRr wRwrrrRrRRld!!!");
      var jsonOut = JSON.stringify({results: unzombified}, null, '\t');
      response.write(jsonOut);
      response.end();
      return;
    }

    response.write("Hello Node.JS");
    response.end();
  }

  function messageRequestProperties(request) {
    var message = "Request properties....\n";

    message += " [url]   : " + request["url"] + "\n";
    message += " [method]: " + request["method"] + "\n";
    message += " [headers]: " + "\n";
    var headers = request["headers"];
    for (var key in headers) {
      var value = headers[key];
      message += "    [headers." + key + "] : " + value + "\n";
    }
    return message;
  }

  function showRequestProperties(request) {
    console.log(messageRequestProperties(request));
  }

  function showAllProperties(title, obj) {
    console.log(title + "[" + obj + "]");

    for (var key in obj) {
      var value = obj[key];
      console.log(" [" + key + "] : " + value);
    }
  }


})();
