import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../../services/API';
import { SIGN_UP_REQUEST, signUpSuccess, signUpFail } from '../ducks/SignUp';

export function* signUp(action) {
  const { profileType } = action.userToCreate;

  const resource = profileType === 'STUDENT' ? 'students' : 'personals';

  try {
    const response = yield call(API.post, `/${resource}`, action.userToCreate);

    if (response && response.status === 201) {
      yield put(signUpSuccess());
    }
  } catch (error) {
    yield put(signUpFail(error));
  }
}

export default all([takeLatest(SIGN_UP_REQUEST, signUp)]);
