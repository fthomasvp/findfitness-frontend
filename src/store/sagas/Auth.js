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

  try {
    const response = yield call(API.post, `/${resource}`, action.userToCreate);

    if (response && response.status === 201) {
      yield put(signUpSuccess());
    }
  } catch (error) {
    yield put(signUpFail(error.response.data));
  }
}

export function* signIn(action) {
  try {
    const response = yield call(API.post, '/login', action.payload);

    if (response && response.status === 200) {
      API.defaults.headers.common['Authorization'] =
        response.headers.authorization;

      yield put(signInSuccess(response));
    }
  } catch (error) {
    yield put(signInFail(error.response.data));
  }
}

export default all([
  takeLatest(SIGN_UP_REQUEST, signUp),
  takeLatest(SIGN_IN_REQUEST, signIn),
]);
