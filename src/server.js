const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': cssHandler.getStyle,
  defaultFunc: htmlHandler.getIndex
}

// Handles requests from the server
const onRequest = (request, response) => {
  // Parse the url from the request
  const parsedURL = url.parse(request.url);

  // Get the accept headers
  const acceptedTypes = request.headers.accept.split(',');

  // If the parsed url matches one of the urls in 'urlStruct' call its corresponding function
  // Otherwise, send them to the 404 page
  urlStruct[parsedURL.pathname](request, response, acceptedTypes) ?? urlStruct.defaultFunc(request, response, acceptedTypes);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
