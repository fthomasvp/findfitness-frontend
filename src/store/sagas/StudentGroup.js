import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../../services/API';
import {
  SEARCH_STUDENT_GROUP_REQUEST,
  searchStudentGroupSuccess,
  searchStudentGroupFail,
  CREATE_STUDENT_GROUP_REQUEST,
  createStudentGroupSucess,
  createStudentGroupFail,
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

export function* createStudentGroup(action) {
  const { studentGroup } = action;

  const requestBody = _makeStudentGroupBodyRequest(studentGroup);

  try {
    const response = yield call(API.post, `/student_groups`, requestBody);

    if (response && response.status === 201) {
      yield put(createStudentGroupSucess());
    }
  } catch (error) {
    yield put(createStudentGroupFail(error.response || error));
  }
}

export default all([
  takeLatest(SEARCH_STUDENT_GROUP_REQUEST, searchStudentGroup),
  takeLatest(CREATE_STUDENT_GROUP_REQUEST, createStudentGroup),
]);

function _makeStudentGroupBodyRequest(studentGroup) {
  const { firstStepData, secondStepData, thirdStepData } = studentGroup;

  // Get Personal id
  const persistedSession = JSON.parse(
    sessionStorage.getItem('persist:findfitness')
  );
  const AUTH = JSON.parse(persistedSession.auth);
  const { user } = AUTH;
  const { id: idPersonal } = user;

  // Get Address data
  const address = {
    ...thirdStepData,
    state: thirdStepData.state.initials,
    number: thirdStepData.number || null,
    complement: thirdStepData.complement || null,
    referenceLocation: thirdStepData.referenceLocation || null,
  };
  const firstPart = address.zipcode.slice(0, 5);
  const secondPart = address.zipcode.slice(5);

  const formatedZipCode = `${firstPart}-${secondPart}`;
  address.zipcode = formatedZipCode;

  // Get StudentGroup data
  const {
    contactPhone,
    selectedBeginDateTime: eventDateTimeBegin,
    selectedEndDateTime: eventDateTimeEnd,
    eventPrice,
    minQtyStudents: minStudentGroupAmount,
    maxQtyStudents: maxStudentGroupAmount,
  } = firstStepData;

  // Get Exercises ids
  const idExercises = [...secondStepData];

  const requestBody = {
    contactPhone,
    eventDateTimeBegin,
    eventDateTimeEnd,
    eventPrice,
    minStudentGroupAmount,
    maxStudentGroupAmount,

    address,

    idPersonal,

    idExercises,
  };

  return requestBody;
}
