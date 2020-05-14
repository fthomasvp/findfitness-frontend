import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../../services/API';
import {
  SEARCH_EXERCISES_REQUEST,
  searchExercisesSuccess,
  searchExercisesFail,
} from '../ducks/Exercise';

export function* searchExercises(action) {
  const { pagination } = action;

  try {
    const response = yield call(
      API.get,
      `/exercises?page=${pagination.page}&size=${pagination.size}`
    );

    if (response && response.status === 200) {
      yield put(searchExercisesSuccess(response));
    }
  } catch (error) {
    yield put(searchExercisesFail(error.response || error));
  }
}

export default all([
  takeLatest(SEARCH_EXERCISES_REQUEST, searchExercises),
]);
