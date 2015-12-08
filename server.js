
( function () {
  var http = require('http');
  var server = http.createServer(handleRequest);
  server.listen (1127, function () {
    console.log('Start Zmobify server....')
  });

  function handleRequest (request, response) {
    if (request.url === '/favicon.ico') {
      response.writeHead(200);
      response.end();
      return;
    }

    showAllProperties("Request: ", request);
    // showAllProperties("Response: ", response);
    response.write("Hello Node.JS");
    response.end();
  }

  function showAllProperties(title, obj) {
    console.log(title + "[" + obj + "]");
    for (var key in obj) {
      var value = obj[key];
      // if (!!obj.key) value = obj[key];
      console.log(" [" + key + "] : " + value);
    }
  }
})();
