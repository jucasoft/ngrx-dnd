const express = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const authConfig = {
  domain: '',
  audience: '',
  appUri: 'http://localhost:4200',
};

if (!authConfig.domain || !authConfig.audience) {
  throw 'Please make sure that auth_config.json is in place and populated';
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
});

const api = '/api/v1';
// Serve static files....
server.use(express.static(__dirname + '/dist/ngrx-dnd'));

server.use(
  cors({
    origin: authConfig.appUri,
  })
);

server.use(api, checkJwt);
server.use(api, middlewares);
server.use(api, router);

server.get('**', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/ngrx-dnd/index.html'));
});

router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data
  })
};

server.listen(process.env.PORT || 3000, (res) => {
  console.log('JSON Server is running on: http://localhost:3000');
});
