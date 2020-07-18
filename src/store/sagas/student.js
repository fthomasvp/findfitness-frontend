import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import * as StudentReducer from '../ducks/student';

export function* fetchPaymentMethods(action) {
  const { idStudent } = action;

  try {
    const response = yield call(
      API.get,
      `/students/${idStudent}/payment_methods`
    );

    if (response && response.status === 200) {
      yield put(StudentReducer.fetchPaymentMethodsSuccess(response));
    }
  } catch (error) {
    yield put(StudentReducer.fetchPaymentMethodsFail(error.response || error));
  }
}

export function* fetchPayments(action) {
  const { idStudent, pagination } = action;

  const { page, size } = pagination;

  try {
    const response = yield call(
      API.get,
      `/students/${idStudent}/payments?page=${page}&size=${size}`
    );

    if (response && response.status === 200) {
      yield put(StudentReducer.fetchPaymentsSuccess(response));
    }
  } catch (error) {
    yield put(StudentReducer.fetchPaymentsFail(error.response || error));
  }
}

export function* createPaymentMethod(action) {
  const { idStudent, paymentMethod } = action;

  try {
    const response = yield call(
      API.post,
      `/students/${idStudent}/payment_methods`,
      paymentMethod
    );

    if (response && response.status === 201) {
      yield put(StudentReducer.createPaymentMethodsSuccess(response));
    }
  } catch (error) {
    yield put(StudentReducer.createPaymentMethodsFail(error.response || error));
  }
}

export default all([
  takeLatest(StudentReducer.FETCH_PAYMENT_METHODS_REQUEST, fetchPaymentMethods),
  takeLatest(StudentReducer.FETCH_PAYMENTS_REQUEST, fetchPayments),
  takeLatest(
    StudentReducer.CREATE_PAYMENT_METHODS_REQUEST,
    createPaymentMethod
  ),
]);
