import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import {
  FETCH_PERSONAL_STUDENT_GROUPS_REQUEST,
  fetchPersonalStudentGroupsSuccess,
  fetchPersonalStudentGroupsFail,
  CREATE_PERSONAL_EVALUATION_REQUEST,
  createPersonalEvaluationSuccess,
  createPersonalEvaluationFail,
} from '../ducks/Personal';

export function* fetchPersonalStudentGroups(action) {
  const { userId } = action;

  try {
    const response = yield call(API.get, `/personals/${userId}/student_groups`);

    if (response && response.status === 200) {
      yield put(fetchPersonalStudentGroupsSuccess(response));
    }
  } catch (error) {
    yield put(fetchPersonalStudentGroupsFail(error.response || error));
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
      yield put(createPersonalEvaluationSuccess(response));
    }
  } catch (error) {
    yield put(createPersonalEvaluationFail(error.response || error));
  }
}

export default all([
  takeLatest(FETCH_PERSONAL_STUDENT_GROUPS_REQUEST, fetchPersonalStudentGroups),
  takeLatest(CREATE_PERSONAL_EVALUATION_REQUEST, createPersonalEvaluation),
]);
