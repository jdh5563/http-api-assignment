const fs = require('fs');

// The 3 pages the user can go to
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// Getters that send the user to the correct page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

module.exports = {
  getIndex,
};
