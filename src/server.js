const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
// TODO: require any necessary handlers

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles requests from the server
const onRequest = (request, response) => {
  console.log(request.url);

  // TODO: make a switch based on 'request.url' to go to different pages
  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      cssHandler.getStyle(request, response);
      break;
    default:
      // TODO: Change the default case to a 404
      htmlHandler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
