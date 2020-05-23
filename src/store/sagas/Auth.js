import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../../services/API';
import {
  SIGN_UP_REQUEST,
  signUpSuccess,
  signUpFail,
  SIGN_IN_REQUEST,
  signInSuccess,
  signInFail,
} from '../ducks/Auth';

// put: faz a chamada de uma "Action Creators"

export function* signUp(action) {
  const { profileType } = action.userToCreate;

  const resource = profileType === 'STUDENT' ? 'students' : 'personals';

  const requestBody = _makeUserBodyRequest(action.userToCreate);

  try {
    const response = yield call(API.post, `/${resource}`, requestBody);

    if (response && response.status === 201) {
      yield put(signUpSuccess());
    }
  } catch (error) {
    yield put(signUpFail(error.response || error));
  }
}

export function* signIn(action) {
  try {
    const response = yield call(API.post, '/login', action.payload);

    if (response && response.status === 200) {
      yield put(signInSuccess(response));
    }
  } catch (error) {
    yield put(signInFail(error.response || error));
  }
}

export default all([
  takeLatest(SIGN_UP_REQUEST, signUp),
  takeLatest(SIGN_IN_REQUEST, signIn),
]);

function _makeUserBodyRequest(userToCreate) {
  const {
    profileType,
    personal,
    student,
    address: addressFromForm,
  } = userToCreate;

  let requestBody = {};

  if (profileType === 'STUDENT') {
    requestBody = {
      student,
    };
  } else {
    requestBody = {
      personal,
    };
  }

  // Get Address data
  const address = {
    ...addressFromForm,
    state: addressFromForm.state.initials,
    number: addressFromForm.number || '',
    complement: addressFromForm.complement || '',
    referenceLocation: addressFromForm.referenceLocation || '',
  };

  requestBody = {
    ...requestBody,
    address,
  };

  return requestBody;
}
