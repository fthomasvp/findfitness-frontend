/**
 * Action Types
 * */
export const SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = '@auth/SIGN_IN_FAIL';

/**
 * Action Creators
 * */
export const signInRequest = (email, password) => {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password },
  };
};

export const signInSuccess = ({ data, headers }) => {
  return {
    type: SIGN_IN_SUCCESS,
    data,
    headers,
  };
};

export const signInFail = error => {
  return {
    type: SIGN_IN_FAIL,
    error,
  };
};

/**
 * Reducer
 * */
const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: null,
};

export const signIn = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          email: action.data.email,
          profile: action.data.authorities[0].authority,
        },
        isAuthenticated: true,
      };

    case SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: { ...action.error, description: 'Email ou Senha inválido' },
      };

    default:
      return state;
  }
};
