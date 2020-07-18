import { combineReducers } from 'redux';

import { auth } from './auth';
import { studentGroup } from './student_group';
import { exercise } from './exercise';
import { localization } from './localization';
import { student } from './student';
import { personal } from './personal';

export default combineReducers({
  auth,
  studentGroup,
  exercise,
  localization,
  student,
  personal,
});
