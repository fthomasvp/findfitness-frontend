import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import * as AuthReducer from '../ducks/auth';

export function* signUp(action) {
  const { profileType } = action.userToCreate;

  const resource = profileType === 'STUDENT' ? 'students' : 'personals';

  const requestBody = _makeUserBodyRequest(action.userToCreate);

  try {
    const response = yield call(API.post, `/${resource}`, requestBody);

    if (response && response.status === 201) {
      yield put(AuthReducer.signUpSuccess(response));
    }
  } catch (error) {
    yield put(AuthReducer.signUpFail(error.response || error));
  }
}

export function* signIn(action) {
  try {
    const response = yield call(API.post, '/login', action.payload);

    if (response && response.status === 200) {
      yield put(AuthReducer.signInSuccess(response));
    }
  } catch (error) {
    yield put(AuthReducer.signInFail(error.response || error));
  }
}

export function* uploadProfilePicture(action) {
  const { formData, profile, id } = action;

  const resource = profile === 'ROLE_STUDENT' ? 'students' : 'personals';

  try {
    const response = yield call(
      API.put,
      `/${resource}/${id}/profile_picture`,
      formData,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }
    );

    if (response && response.status === 200) {
      yield put(AuthReducer.uploadProfilePictureSuccess(response));
    }
  } catch (error) {
    yield put(AuthReducer.uploadProfilePictureFail(error.response || error));
  }
}

export function* fetchUserData(action) {
  const { profile, id } = action;

  const resource = profile === 'ROLE_STUDENT' ? 'students' : 'personals';

  try {
    const response = yield call(API.get, `/${resource}/${id}`);

    if (response && response.status === 200) {
      yield put(AuthReducer.fetchUserDataSuccess(response));
    }
  } catch (error) {
    yield put(AuthReducer.fetchUserDataFail(error.response || error));
  }
}

export function* patchUserData(action) {
  const { profile, userData } = action;

  const resource = profile === 'ROLE_STUDENT' ? 'students' : 'personals';

  let data = {};

  if (resource === 'students') {
    data = {
      student: userData,
    };
  } else {
    data = {
      personal: userData,
    };
  }

  try {
    const response = yield call(API.patch, `/${resource}/${userData.id}`, data);

    if (response && response.status === 204) {
      yield put(AuthReducer.patchUserDataSuccess(response));
    }
  } catch (error) {
    yield put(AuthReducer.patchUserDataFail(error.response || error));
  }
}

export function* patchUserAddressData(action) {
  const { profile, id, userAddressData } = action;

  const resource = profile === 'ROLE_STUDENT' ? 'students' : 'personals';

  const data = {
    address: userAddressData,
  };

  try {
    const response = yield call(API.patch, `/${resource}/${id}/address`, data);

    if (response && response.status === 204) {
      yield put(AuthReducer.patchUserAddressDataSuccess(response));
    }
  } catch (error) {
    yield put(AuthReducer.patchUserAddressDataFail(error.response || error));
  }
}

export function* patchUserHealthCardData(action) {
  const { id, userHealthCardData } = action;

  const data = {
    healthCard: userHealthCardData,
  };

  try {
    const response = yield call(API.patch, `/students/${id}/health_card`, data);

    if (response && response.status === 204) {
      yield put(AuthReducer.patchUserHealthCardDataSuccess(response));
    }
  } catch (error) {
    yield put(AuthReducer.patchUserHealthCardDataFail(error.response || error));
  }
}

export function* createUserHealthCard(action) {
  const { id, healthCard } = action;

  try {
    const response = yield call(
      API.post,
      `/students/${id}/health_card`,
      healthCard
    );

    if (response && response.status === 201) {
      yield put(AuthReducer.createUserHealthCardSuccess(response));
    }
  } catch (error) {
    yield put(AuthReducer.createUserHealthCardFail(error.response || error));
  }
}

export default all([
  takeLatest(AuthReducer.SIGN_UP_REQUEST, signUp),
  takeLatest(AuthReducer.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthReducer.UPLOAD_PROFILE_PICTURE_REQUEST, uploadProfilePicture),
  takeLatest(AuthReducer.FETCH_USER_DATA_REQUEST, fetchUserData),
  takeLatest(AuthReducer.PATCH_USER_DATA_REQUEST, patchUserData),
  takeLatest(AuthReducer.PATCH_USER_ADDRESS_DATA_REQUEST, patchUserAddressData),
  takeLatest(
    AuthReducer.PATCH_USER_HEALTH_CARD_DATA_REQUEST,
    patchUserHealthCardData
  ),
  takeLatest(AuthReducer.CREATE_USER_HEALTH_CARD_REQUEST, createUserHealthCard),
]);

function _makeUserBodyRequest(userToCreate) {
  const {
    profileType,
    personal,
    student,
    address: addressFromForm,
  } = userToCreate;

  let requestBody = {};

  if (profileType === 'STUDENT') {
    requestBody = {
      student,
    };
  } else {
    requestBody = {
      personal,
    };
  }

  // Get Address data
  const address = {
    ...addressFromForm,
    state: addressFromForm.state,
    number: addressFromForm.number || '',
    complement: addressFromForm.complement || '',
    referenceLocation: addressFromForm.referenceLocation || '',
  };

  requestBody = {
    ...requestBody,
    address,
  };

  return requestBody;
}
