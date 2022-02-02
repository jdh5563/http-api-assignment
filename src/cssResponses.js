const fs = require('fs');

// The 3 pages the user can go to
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

// Getters that send the user to the correct page
const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

module.exports = {
  getStyle,
};
