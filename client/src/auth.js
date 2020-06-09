// import auth0 from 'auth0-js';
import axios from 'axios';

import history from './history';

export default class Auth {
  // auth0 = new auth0.WebAuth({
  //   domain: "dev-oq7p6fu6.auth0.com",
  //   clientID: "ul2wAtE3ZjPZjoYumLvpI0kB1NyBxvBG",
  //   redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://helping-hand-drp08.herokuapps.com/callback',
  //   audience: 'https://dev-oq7p6fu6.auth0.com/userinfo',
  //   responseType: 'token id_token',
  //   scope: 'openid'
  // });

  login = (creds, resolve, reject) => {
      axios.post("/volunteers/login", creds)
      .then((item)=> {
        console.log(item);
        if (item.data.success) {          
          this.setSession(item.data);
          resolve(true);
        }
        resolve(false);
      })
      .catch(err => {console.error(err); resolve(false);});

      axios.post("/pins/login", creds)
      .then((item)=> {
        console.log(item);
        if (item.data.success) {          
          this.setSession(item.data);
          resolve(true);
        }
        resolve(false);
      })
      .catch(err => {console.error(err); resolve(false);});
  }

  // handleAuthentication = () => {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       this.setSession(authResult);
  //       history.replace('/callback');
  //     } else if (err) {
  //       history.replace('/callback');
  //       console.log(err);
  //     }
  //   });
  // }

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    // let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    let expiresAt = (24 * 60 * 60 * 1000) + new Date().getTime();
    localStorage.setItem('id_token', authResult.id);
    localStorage.setItem('user_type', authResult.type);
    localStorage.setItem('expires_at', expiresAt);
    history.replace(this.isPin() ? '/service' : '/volunteer');
    window.location.reload();
  }

  // removes user details from localStorage
  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_type');
    // navigate to the home route
    history.replace('/');
    window.location.reload();
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  isPin = () => {
    return localStorage.getItem('user_type') == 'pin';
  }
}