const http = require('http');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);
  console.log(JSON.stringify(request.headers.accept));
  switch (request.url) {
    case '/':
      responseHandler.getIndex(request, response);
      break;
    case '/style.css':
      responseHandler.getCSS(request, response);
      break;
    case '/success':
      responseHandler.getSuccess(request, response);
      break;
    case '/badRequest':
      responseHandler.getBadRequest(request, response);
      break;
    case '/badRequest?valid=true':
      responseHandler.getBadRequestTrue(request, response);
      break;
    case '/unauthorized':
      responseHandler.getUnauthorizedRequest(request, response);
      break;
    case '/unauthorized?loggedIn=yes':
      responseHandler.getUnauthorizedRequestTrue(request, response);
      break;
    case '/forbidden':
      responseHandler.getForbiddenRequest(request, response);
      break;
    case '/internal':
      responseHandler.getInternalRequest(request, response);
      break;
    case '/notImplemented':
      responseHandler.getNotImplementedRequest(request, response);
      break;
    default:
      responseHandler.getNothingYouLoseGoodDaySir(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
