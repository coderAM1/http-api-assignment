const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styleSheet = fs.readFileSync(`${__dirname}/../client/style.css`);

const getResponse = (request, response, type, item) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(item);
  response.end();
};
const getResponseJSON = (request, response, type, item, value) => {
  response.writeHead(value, { 'Content-Type': type, 'Access-Control-Allow-Origin': '*' });
  response.write(JSON.stringify(item));
  response.end();
};

const getResponseXML = (request, response, type, item, value) => {
  response.writeHead(value, { 'Content-Type': type, 'Access-Control-Allow-Origin': '*' });
  response.write(item);
  response.end();
};

const getIndex = (request, response) => {
  getResponse(request, response, 'text/html', index);
};

const getCSS = (request, response) => {
  getResponse(request, response, 'text/css', styleSheet);
};

const getSuccess = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = `
    <response>
      <message>This is a successful response</message>
    </resposne>
    `;
    getResponseXML(request, response, 'text/xml', responseXML, 200);
  } else {
    const item = { message: 'This is a successful response' };
    getResponseJSON(request, response, 'application/json', item, 200);
  }
};

const getBadRequest = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = `
    <response>
      <message>Missing valid query parameter set to true</message>
      <id>badRequest</id>
    </resposne>
    `;
    getResponseXML(request, response, 'text/xml', responseXML, 400);
  } else {
    const item = {
      message: 'Missing valid query parameter set to true',
      id: 'badRequest',
    };
    getResponseJSON(request, response, 'application/json', item, 400);
  }
};

const getBadRequestTrue = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = `
    <response>
      <message>This request has the required parameters</message>
    </resposne>
    `;
    getResponseXML(request, response, 'text/xml', responseXML, 200);
  } else {
    const item = { message: 'This request has the required parameters' };
    getResponseJSON(request, response, 'application/json', item, 200);
  }
};

const getUnauthorizedRequest = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = `
    <response>
      <message>Missing loggedIn query parameter set to yes</message>
      <id>unauthorized</id>
    </resposne>
    `;
    getResponseXML(request, response, 'text/xml', responseXML, 401);
  } else {
    const item = {
      message: 'Missing loggedIn query parameter set to yes',
      id: 'unauthorized',
    };
    getResponseJSON(request, response, 'application/json', item, 401);
  }
};

const getUnauthorizedRequestTrue = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = `
    <response>
      <message>you have successfully viewed the content</message>
    </resposne>
    `;
    getResponseXML(request, response, 'text/xml', responseXML, 200);
  } else {
    const item = { message: 'you have successfully viewed the content' };
    getResponseJSON(request, response, 'application/json', item, 200);
  }
};

const getForbiddenRequest = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = `
    <response>
      <message>You do not have access to this content</message>
      <id>forbidden</id>
    </resposne>
    `;
    getResponseXML(request, response, 'text/xml', responseXML, 403);
  } else {
    const item = {
      message: 'You do not have access to this content',
      id: 'forbidden',
    };
    getResponseJSON(request, response, 'application/json', item, 403);
  }
};

const getInternalRequest = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = `
    <response>
      <message>Internal Server Error. Something went wrong</message>
      <id>internalError</id>
    </resposne>
    `;
    getResponseXML(request, response, 'text/xml', responseXML, 500);
  } else {
    const item = {
      message: 'Internal Server Error. Something went wrong',
      id: 'internalError',
    };
    getResponseJSON(request, response, 'application/json', item, 500);
  }
};

const getNotImplementedRequest = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = `
    <response>
      <message>A get request for this page has not been implemented yet. Check again later for updated content.</message>
      <id>notImplemented</id>
    </resposne>
    `;
    getResponseXML(request, response, 'text/xml', responseXML, 501);
  } else {
    const item = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content',
      id: 'notImplemented',
    };
    getResponseJSON(request, response, 'application/json', item, 501);
  }
};

const getNothingYouLoseGoodDaySir = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = `
    <response>
      <message>So you get nothing, you lose! Good day sir!</message>
      <id>notFound</id>
    </resposne>
    `;
    getResponseXML(request, response, 'text/xml', responseXML, 404);
  } else {
    const item = {
      message: 'So you get nothing, you lose! Good day sir!',
      id: 'notFound',
    };
    getResponseJSON(request, response, 'application/json', item, 404);
  }
};

module.exports = {
  getIndex,
  getCSS,
  getSuccess,
  getBadRequest,
  getBadRequestTrue,
  getUnauthorizedRequest,
  getUnauthorizedRequestTrue,
  getForbiddenRequest,
  getNothingYouLoseGoodDaySir,
  getInternalRequest,
  getNotImplementedRequest,
};
