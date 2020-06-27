import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import {
  FETCH_STATES_REQUEST,
  fetchStatesSuccess,
  fetchStatesFail,
  SEARCH_ADDRESS_BY_ZIPCODE_REQUEST,
  searchAddressByZipcodeFail,
  FETCH_CITIES_BY_STATE_ID_REQUEST,
  fetchCitiesByStateIdSuccess,
  fetchCitiesByStateIdFail,
} from '../ducks/Localization';
import {
  updateThirdStepData,
  // updateThirdStepStateField,
} from '../ducks/StudentGroup';
import { updateAddressData, updateAddressProfileData } from '../ducks/Auth';

export function* fetchStates() {
  try {
    const response = yield call(API.get, `/localizations/states`);

    if (response && response.status === 200) {
      yield put(fetchStatesSuccess(response));
    }
  } catch (error) {
    yield put(fetchStatesFail(error.response || error));
  }
}

export function* searchAddressByZipCode(action) {
  try {
    const { zipcode, states, fromPage = '' } = action;

    const response = yield call(API.get, `/localizations?cep=${zipcode}`);

    if (response && response.status === 200) {
      if (fromPage === 'signup') {
        yield put(updateAddressData(response, states));
      }

      if (fromPage === 'studentgroups') {
        yield put(updateThirdStepData(response, states));
      }

      if (fromPage === 'profile') {
        yield put(updateAddressProfileData(response, states));
      }
    }
  } catch (error) {
    yield put(searchAddressByZipcodeFail(error.response || error));
  }
}

export function* fetchCitiesByStateId(action) {
  try {
    const response = yield call(
      API.get,
      `/localizations/states/${action.selectedState}/cities`
    );

    if (response && response.status === 200) {
      yield put(fetchCitiesByStateIdSuccess(response));
      // Foi preciso passar todo o objeto do Estado para renderizar no
      // campo do Step 3
      // yield put(updateThirdStepStateField(action.selectedState));
    }
  } catch (error) {
    yield put(fetchCitiesByStateIdFail(error.response || error));
  }
}

export default all([
  takeLatest(FETCH_STATES_REQUEST, fetchStates),
  takeLatest(SEARCH_ADDRESS_BY_ZIPCODE_REQUEST, searchAddressByZipCode),
  takeLatest(FETCH_CITIES_BY_STATE_ID_REQUEST, fetchCitiesByStateId),
]);
