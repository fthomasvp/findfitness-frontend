import { combineReducers } from 'redux';
import { auth } from './Auth';
import { studentGroup } from './StudentGroup';

export default combineReducers({
  auth,
  studentGroup,
});
