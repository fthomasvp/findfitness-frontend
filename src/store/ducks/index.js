import { combineReducers } from 'redux';
import { signIn } from './SignIn';
import { signUp } from './SignUp';

export default combineReducers({
  signIn,
  signUp,
});
