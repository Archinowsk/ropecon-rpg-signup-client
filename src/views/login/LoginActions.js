import { postLogin } from '../../app/api';

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT';

const submitLoginAsync = (username, loggedIn, jwtToken) => {
  return {
    type: SUBMIT_LOGIN,
    username,
    loggedIn,
    jwtToken,
  };
};

export const submitLogin = loginData => dispatch =>
  postLogin(loginData)
    .then(response => {
      console.log('submitLogin() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(submitLoginAsync(loginData.username, true, response.jwtToken));
      }
      return response;
    })
    .catch(error => {
      dispatch(submitLoginAsync(error));
    });

export const submitLogout = () => {
  return {
    type: SUBMIT_LOGOUT,
    username: '',
    loggedIn: false,
  };
};
