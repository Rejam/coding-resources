import auth0js from 'auth0-js';

const auth0Client = () => {
  const auth0 = new auth0js.WebAuth({
    domain: 'rejam.eu.auth0.com',
    audience: 'https://rejam.eu.auth0.com/userinfo',
    clientID: 'i5nd0pTgD658BmsbFDUa0CM7pB4WJsxA',
    redirectUri: 'http://localhost:8080/auth/callback',
    responseType: 'id_token',
    scope: 'openid profile',
  });

  let profile;
  let idToken;
  let expiresAt;

  function getProfile() {
    return profile;
  }

  function getIdToken() {
    return idToken;
  }

  function handleAuth() {
    return new Promise((resolve, reject) => {
      auth0.parseHash((err, authResult) => {
        console.log('auth result', authResult);
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) return reject(err);
        idToken = authResult.idToken;
        profile = authResult.idTokenPayload;
        expiresAt = authResult.idTokenPayload.exp * 1000;
        return resolve();
      });
    });
  }

  function isAuthenticated() {
    return new Date().getTime() < expiresAt;
  }

  function signIn() {
    auth0.authorize();
  }

  function signOut() {
    idToken = null;
    profile = null;
    expiresAt = null;
  }

  return Object.freeze({
    getProfile,
    getIdToken,
    handleAuth,
    isAuthenticated,
    signIn,
    signOut,
  });
};

// class Auth {
//   constructor() {
//     this.auth0 = new auth0js.WebAuth({
//       domain: 'rejam.eu.auth0.com',
//       audience: 'https://rejam.eu.auth0.com/userinfo',
//       clientID: 'i5nd0pTgD658BmsbFDUa0CM7pB4WJsxA',
//       redirectUri: 'http://localhost:8080/auth/callback',
//       responseType: 'id_token',
//       scope: 'openid profile',
//     });

//     this.getProfile = this.getProfile.bind(this);
//     this.handleAuthentication = this.handleAuthentication.bind(this);
//     this.isAuthenticated = this.isAuthenticated.bind(this);
//     this.signIn = this.signIn.bind(this);
//     this.signOut = this.signOut.bind(this);
//   }

//   getProfile() {
//     return this.profile;
//   }

//   getIdToken() {
//     return this.idToken;
//   }

//   isAuthenticated() {
//     return new Date().getTime() < this.expiresAt;
//   }

//   signIn() {
//     this.auth0.authorize();
//   }

//   handleAuthentication() {
//     return new Promise((resolve, reject) => {
//       this.auth0.parseHash((err, authResult) => {
//         if (err) return reject(err);
//         if (!authResult || !authResult.idToken) {
//           return reject(err);
//         }
//         this.idToken = authResult.idToken;
//         this.profile = authResult.idTokenPayload;
//         // set the time that the id token will expire at
//         this.expiresAt = authResult.idTokenPayload.exp * 1000;
//         resolve();
//       });
//     })
//   }

//   signOut() {
//     // clear id token, profile, and expiration
//     this.idToken = null;
//     this.profile = null;
//     this.expiresAt = null;
//   }
// }

// const auth0Client = new Auth();
// console.log(auth0Client());

export default auth0Client();
