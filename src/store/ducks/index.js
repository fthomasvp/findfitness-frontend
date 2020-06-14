import { combineReducers } from 'redux';

import { auth } from './Auth';
import { studentGroup } from './StudentGroup';
import { exercise } from './Exercise';
import { localization } from './Localization';
import { student } from './Student';

export default combineReducers({
  auth,
  studentGroup,
  exercise,
  localization,
  student,
});
