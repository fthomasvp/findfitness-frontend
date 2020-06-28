import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import {
  FETCH_PAYMENT_METHODS_REQUEST,
  fetchPaymentMethodsSuccess,
  fetchPaymentMethodsFail,
  FETCH_PAYMENTS_REQUEST,
  fetchPaymentsSuccess,
  fetchPaymentsFail,
  CREATE_PAYMENT_METHODS_REQUEST,
  createPaymentMethodsSuccess,
  createPaymentMethodsFail,
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

export function* fetchPayments(action) {
  const { idStudent, pagination } = action;

  const { page, size } = pagination;

  try {
    const response = yield call(
      API.get,
      `/students/${idStudent}/payments?page=${page}&size=${size}`
    );

    if (response && response.status === 200) {
      yield put(fetchPaymentsSuccess(response));
    }
  } catch (error) {
    yield put(fetchPaymentsFail(error.response || error));
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
      yield put(createPaymentMethodsSuccess(response));
    }
  } catch (error) {
    yield put(createPaymentMethodsFail(error.response || error));
  }
}

export default all([
  takeLatest(FETCH_PAYMENT_METHODS_REQUEST, fetchPaymentMethods),
  takeLatest(FETCH_PAYMENTS_REQUEST, fetchPayments),
  takeLatest(CREATE_PAYMENT_METHODS_REQUEST, createPaymentMethod),
]);
