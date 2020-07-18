import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import * as PersonalReducer from '../ducks/personal';

export function* fetchPersonalStudentGroups(action) {
  const { userId } = action;

  try {
    const response = yield call(API.get, `/personals/${userId}/student_groups`);

    if (response && response.status === 200) {
      yield put(PersonalReducer.fetchPersonalStudentGroupsSuccess(response));
    }
  } catch (error) {
    yield put(
      PersonalReducer.fetchPersonalStudentGroupsFail(error.response || error)
    );
  }
}

export function* createPersonalEvaluation(action) {
  const { idStudentGroup, idPersonal, evaluation } = action;

  try {
    const response = yield call(
      API.post,
      `/student_groups/${idStudentGroup}/personals/${idPersonal}/evaluations`,
      evaluation
    );

    if (response && response.status === 201) {
      yield put(PersonalReducer.createPersonalEvaluationSuccess(response));
    }
  } catch (error) {
    yield put(
      PersonalReducer.createPersonalEvaluationFail(error.response || error)
    );
  }
}

export default all([
  takeLatest(
    PersonalReducer.FETCH_PERSONAL_STUDENT_GROUPS_REQUEST,
    fetchPersonalStudentGroups
  ),
  takeLatest(
    PersonalReducer.CREATE_PERSONAL_EVALUATION_REQUEST,
    createPersonalEvaluation
  ),
]);
