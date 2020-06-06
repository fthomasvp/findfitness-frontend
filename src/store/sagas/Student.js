import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import {
  FETCH_PAYMENT_METHODS_REQUEST,
  fetchPaymentMethodsSuccess,
  fetchPaymentMethodsFail,
} from '../ducks/Student';

export function* fetchPaymentMethods(action) {
  const { idStudent } = action;

  try {
    const response = yield call(
      API.get,
      `/students/${idStudent}/payment_methods`
    );

    if (response && response.status === 200) {
      yield put(fetchPaymentMethodsSuccess(response));
    }
  } catch (error) {
    yield put(fetchPaymentMethodsFail(error.response || error));
  }
}

export default all([
  takeLatest(FETCH_PAYMENT_METHODS_REQUEST, fetchPaymentMethods),
]);
