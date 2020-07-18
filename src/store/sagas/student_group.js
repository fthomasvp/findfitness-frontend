import { all, call, put, takeLatest } from 'redux-saga/effects';

import API from '../../services/API';
import * as StudentGroupReducer from '../ducks/student_group';

export function* searchStudentGroup(action) {
  const { pagination } = action;

  try {
    const response = yield call(
      API.get,
      `/student_groups?page=${pagination.page}&size=${pagination.size}`
    );

    if (response && response.status === 200) {
      yield put(StudentGroupReducer.searchStudentGroupSuccess(response));
    }
  } catch (error) {
    yield put(
      StudentGroupReducer.searchStudentGroupFail(error.response || error)
    );
  }
}

export function* createStudentGroup(action) {
  const { studentGroup, idPersonal } = action;

  const requestBody = _makeStudentGroupBodyRequest(studentGroup, idPersonal);

  try {
    const response = yield call(API.post, `/student_groups`, requestBody);

    if (response && response.status === 201) {
      yield put(StudentGroupReducer.createStudentGroupSucess(response));
    }
  } catch (error) {
    yield put(
      StudentGroupReducer.createStudentGroupFail(error.response || error)
    );
  }
}

export function* enrollStudent(action) {
  try {
    const response = yield call(
      API.post,
      '/student_groups/enroll',
      action.enrollData
    );

    if (response && response.status === 201) {
      yield put(StudentGroupReducer.enrollStudentGroupSuccess(response));
    }
  } catch (error) {
    yield put(
      StudentGroupReducer.enrollStudentGroupFail(error.response || error)
    );
  }
}

export function* createStudentEvaluation(action) {
  const { idStudentGroup, idStudent, evaluation } = action;

  try {
    const response = yield call(
      API.post,
      `student_groups/${idStudentGroup}/students/${idStudent}/evaluations`,
      evaluation
    );

    if (response && response.status === 201) {
      yield put(StudentGroupReducer.createStudentEvaluationSuccess(response));
    }
  } catch (error) {
    yield put(
      StudentGroupReducer.createStudentEvaluationFail(error.response || error)
    );
  }
}

export default all([
  takeLatest(
    StudentGroupReducer.SEARCH_STUDENT_GROUP_REQUEST,
    searchStudentGroup
  ),
  takeLatest(
    StudentGroupReducer.CREATE_STUDENT_GROUP_REQUEST,
    createStudentGroup
  ),
  takeLatest(StudentGroupReducer.ENROLL_STUDENT_GROUP_REQUEST, enrollStudent),
  takeLatest(
    StudentGroupReducer.CREATE_STUDENT_EVALUATION_REQUEST,
    createStudentEvaluation
  ),
]);

const _makeStudentGroupBodyRequest = (studentGroup, idPersonal) => {
  const { firstStepData, secondStepData, thirdStepData } = studentGroup;

  // Get Address data
  const address = {
    ...thirdStepData,
    state: thirdStepData.state,
    number: thirdStepData.number || '',
    complement: thirdStepData.complement || '',
    referenceLocation: thirdStepData.referenceLocation || '',
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
};
