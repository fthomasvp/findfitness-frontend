import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import * as LocalizationReducer from '../ducks/localization';
import * as StudentGroupReducer from '../ducks/student_group';
import * as AuthReducer from '../ducks/auth';

export function* fetchStates() {
  try {
    const response = yield call(API.get, `/localizations/states`);

    if (response && response.status === 200) {
      yield put(LocalizationReducer.fetchStatesSuccess(response));
    }
  } catch (error) {
    yield put(LocalizationReducer.fetchStatesFail(error.response || error));
  }
}

export function* searchAddressByZipCode(action) {
  try {
    const { zipcode, states, fromPage = '' } = action;

    const response = yield call(API.get, `/localizations?cep=${zipcode}`);

    if (response && response.status === 200) {
      if (fromPage === 'signup') {
        yield put(AuthReducer.updateAddressData(response, states));
      }

      if (fromPage === 'studentgroups') {
        yield put(StudentGroupReducer.updateThirdStepData(response, states));
      }

      if (fromPage === 'profile') {
        yield put(AuthReducer.updateAddressProfileData(response, states));
      }
    }
  } catch (error) {
    yield put(
      LocalizationReducer.searchAddressByZipcodeFail(error.response || error)
    );
  }
}

export function* fetchCitiesByStateId(action) {
  try {
    const response = yield call(
      API.get,
      `/localizations/states/${action.selectedState}/cities`
    );

    if (response && response.status === 200) {
      yield put(LocalizationReducer.fetchCitiesByStateIdSuccess(response));
    }
  } catch (error) {
    yield put(
      LocalizationReducer.fetchCitiesByStateIdFail(error.response || error)
    );
  }
}

export default all([
  takeLatest(LocalizationReducer.FETCH_STATES_REQUEST, fetchStates),
  takeLatest(
    LocalizationReducer.SEARCH_ADDRESS_BY_ZIPCODE_REQUEST,
    searchAddressByZipCode
  ),
  takeLatest(
    LocalizationReducer.FETCH_CITIES_BY_STATE_ID_REQUEST,
    fetchCitiesByStateId
  ),
]);
