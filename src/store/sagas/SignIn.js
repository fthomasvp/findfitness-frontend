import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../../services/API';
import { signInFail, signInSuccess, SIGN_IN_REQUEST } from '../ducks/SignIn';

// put: faz a chamada de uma "Action Creators"

export function* signIn(action) {
  try {
    const response = yield call(API.post, '/login', action.payload);

    if (response && response.status === 200) {
      API.defaults.headers.common['Authorization'] = response.headers.authorization;

      yield put(signInSuccess(response));
    }
  } catch (error) {
    yield put(signInFail(error));
  }
}

export default all([takeLatest(SIGN_IN_REQUEST, signIn)]);
