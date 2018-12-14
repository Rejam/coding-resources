const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  // Auth0 client ID
  audience: 'i5nd0pTgD658BmsbFDUa0CM7pB4WJsxA',
  // Auth0 domain
  issuer: 'rejam.eu.auth0.com',
  algorithms: ['RS256'],
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://rejam.eu.auth0.com/.well-known/jwks.json',
  }),
});

module.exports = checkJwt;
