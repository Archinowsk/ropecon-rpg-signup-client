import { postSignup } from '../../app/api';

export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP';
export const SUBMIT_SELECT_DATE = 'SUBMIT_SELECT_DATE';
export const SUBMIT_SELECT_GAME = 'SUBMIT_SELECT_GAME';
export const SUBMIT_DESELECT_GAME = 'SUBMIT_DESELECT_GAME';
export const SUBMIT_UPDATE_GAME = 'SUBMIT_UPDATE_GAME';

const submitSignupAsync = status => {
  return {
    type: SUBMIT_SIGNUP,
    status,
  };
};

export const submitSignup = signupData => dispatch =>
  postSignup(signupData)
    .then(response => {
      console.log('submitSignup() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(submitSignupAsync(true));
      }
      return undefined;
    })
    .catch(error => {
      console.log(error);
      dispatch(submitSignupAsync(false));
    });

export const submitSelectDate = date => {
  return {
    type: SUBMIT_SELECT_DATE,
    date,
  };
};

export const submitSelectGame = signupData => {
  return {
    type: SUBMIT_SELECT_GAME,
    signupData,
  };
};

export const submitDeselectGame = gameIndex => {
  return {
    type: SUBMIT_DESELECT_GAME,
    gameIndex,
  };
};

export const submitUpdatetGame = signupData => {
  return {
    type: SUBMIT_UPDATE_GAME,
    signupData,
  };
};
