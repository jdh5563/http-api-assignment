// function to send a json object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// funcion to send a xml object
const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

// function to show a success status code
const success = (request, response, acceptedTypes) => {
  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML += '<message>This is a successful response</message>';
    responseXML += '</response>';

    // return response passing out string and content type
    return respondXML(request, response, 200, responseXML);
  }

  // message to send
  const responseJSON = {
    message: 'This is a successful response',
  };

  // send our json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, acceptedTypes, params) => {
  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // if the request does not contain a valid=true query parameter
    if (!params.valid || params.valid !== 'true') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML += '<message>Missing valid query parameter set to true</message>';
      responseXML += '<id>badRequest</id>';
      responseXML += '</response>';
      // return our json with a 400 bad request code
      return respondXML(request, response, 400, responseXML);
    }

    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML += '<message>This request has the required parameters</message>';
    responseXML += '</response>';

    // return response passing out string and content type
    return respondXML(request, response, 200, responseXML);
  }

  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  console.log(params);
  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // if the request does not contain a valid=true query parameter
    if (!params.loggedIn || params.loggedIn !== 'true') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML += '<message>Missing loggedIn query parameter set to yes</message>';
      responseXML += '<id>unauthorized</id>';
      responseXML += '</response>';
      // return our json with a 400 bad request code
      return respondXML(request, response, 401, responseXML);
    }

    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML += '<message>This request has the required parameters</message>';
    responseXML += '</response>';

    // return response passing out string and content type
    return respondXML(request, response, 200, responseXML);
  }

  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    // give the error a consistent id
    responseJSON.id = 'unauthorized';
    // return our json with a 401 unauthorized code
    return respondJSON(request, response, 401, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response, acceptedTypes) => {
  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML += '<message>You do not have access to this content.</message>';
    responseXML += '<id>forbidden</id>';
    responseXML += '</response>';

    // return response passing out string and content type
    return respondXML(request, response, 403, responseXML);
  }

  // message to send
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  // send our json with a success status code
  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response, acceptedTypes) => {
  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML += '<message>Internal Server Error. Something went wrong</message>';
    responseXML += '<id>internalError</id>';
    responseXML += '</response>';

    // return response passing out string and content type
    return respondXML(request, response, 500, responseXML);
  }

  // message to send
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };

  // send our json with a success status code
  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, acceptedTypes) => {
  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML += '<message>A get request for this page has not been implemented yet. Check again later for updated content.</message>';
    responseXML += '<id>notImplemented</id>';
    responseXML += '</response>';

    // return response passing out string and content type
    return respondXML(request, response, 501, responseXML);
  }

  // message to send
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // send our json with a success status code
  respondJSON(request, response, 501, responseJSON);
};

// function to show not found error
const notFound = (request, response, acceptedTypes) => {
  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML += '<message>The page you are looking for was not found.</message>';
    responseXML += '<id>notFound</id>';
    responseXML += '</response>';

    // return response passing out string and content type
    return respondXML(request, response, 404, responseXML);
  }

  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
