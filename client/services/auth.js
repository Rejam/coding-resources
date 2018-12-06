import auth0 from 'auth0-js';
import history from './history';

export default {
  auth0: new auth0.WebAuth({
    domain: 'rejam.eu.auth0.com',
    clientID: 'i5nd0pTgD658BmsbFDUa0CM7pB4WJsxA',
    redirectUri: 'http://localhost:8080/login',
    responseType: 'token id_token',
    scope: 'openid',
  }),
  login() {
    this.auth0.authorize();
  },

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      const {accessToken, idToken } = authResult;
      if (authResult && accessToken && idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  },

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');    
  },

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  },

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  },
};
