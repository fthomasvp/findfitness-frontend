import { all } from 'redux-saga/effects';

import Auth from './auth';
import StudentGroup from './student_group';
import Exercise from './exercise';
import Localization from './localization';
import Student from './student';
import Personal from './personal';

export default function* rootSaga() {
  return yield all([
    Auth,
    StudentGroup,
    Exercise,
    Localization,
    Student,
    Personal,
  ]);
}
