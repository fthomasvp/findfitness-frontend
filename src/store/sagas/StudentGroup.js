import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../../services/API';
import {
  SEARCH_STUDENT_GROUP_REQUEST,
  searchStudentGroupSuccess,
  searchStudentGroupFail,
} from '../ducks/StudentGroup';

export function* searchStudentGroup(action) {
  const { pagination } = action;

  try {
    const response = yield call(
      API.get,
      `/student_groups?page=${pagination.page}&size=${pagination.size}`
    );

    if (response && response.status === 200) {
      yield put(searchStudentGroupSuccess(response));
    }
  } catch (error) {
    yield put(searchStudentGroupFail(error.response || error));
  }
}

export default all([
  takeLatest(SEARCH_STUDENT_GROUP_REQUEST, searchStudentGroup),
]);
