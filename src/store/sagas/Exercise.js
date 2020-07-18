import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import * as ExerciseReducer from '../ducks/exercise';

export function* searchExercises(action) {
  const { pagination } = action;

  try {
    const response = yield call(
      API.get,
      `/exercises?page=${pagination.page}&size=${pagination.size}`
    );

    if (response && response.status === 200) {
      yield put(ExerciseReducer.searchExercisesSuccess(response));
    }
  } catch (error) {
    yield put(ExerciseReducer.searchExercisesFail(error.response || error));
  }
}

export default all([
  takeLatest(ExerciseReducer.SEARCH_EXERCISES_REQUEST, searchExercises),
]);
