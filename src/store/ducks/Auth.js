/**
 * Action Types
 * */
export const STORE_PROFILE_TYPE = '@auth/STORE_PROFILE_TYPE';
export const STORE_PERSON_FORM = '@auth/STORE_PERSON_FORM';
export const STORE_ADDRESS_FORM = '@auth/STORE_ADDRESS_FORM';

export const SIGN_UP_REQUEST = '@auth/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = '@auth/SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = '@auth/SIGN_UP_FAIL';

export const SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = '@auth/SIGN_IN_FAIL';

export const SIGN_OUT = '@auth/SIGN_OUT';

/**
 * Action Creators
 * */
export const storeProfileType = profileType => {
  return {
    type: STORE_PROFILE_TYPE,
    profileType,
  };
};

export const storePersonForm = person => {
  return {
    type: STORE_PERSON_FORM,
    person,
  };
};

export const storeAddressForm = address => {
  return {
    type: STORE_ADDRESS_FORM,
    address,
  };
};

export const signUpRequest = userToCreate => {
  return {
    type: SIGN_UP_REQUEST,
    userToCreate,
  };
};

export const signUpSuccess = () => {
  return {
    type: SIGN_UP_SUCCESS,
  };
};

export const signUpFail = error => {
  return {
    type: SIGN_UP_FAIL,
    error,
  };
};

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

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  loading: false,
  user: {},
  isAuthenticated: false,
  userToCreate: {
    profileType: 'STUDENT',
    personal: {
      name: '',
      cref: '',
      phone: '',
      cpf: '',
      password: '',
      gender: '',
      birthdate: '',
      email: '',
    },
    student: {
      name: '',
      phone: '',
      cpf: '',
      password: '',
      gender: '',
      birthdate: '',
      email: '',
    },
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      referenceLocation: '',
      city: '',
      state: '',
      zipcode: '',
    },
  },
  error: null,
};

export const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_PROFILE_TYPE: {
      return {
        ...state,
        userToCreate: {
          ...state.userToCreate,
          profileType: action.profileType,
        },
      };
    }

    case STORE_PERSON_FORM: {
      const { profileType } = state.userToCreate;
      const key = profileType === 'STUDENT' ? 'student' : 'personal';

      return {
        ...state,
        userToCreate: {
          ...state.userToCreate,
          [key]: action.person,
        },
      };
    }

    case STORE_ADDRESS_FORM: {
      return {
        ...state,
        userToCreate: {
          ...state.userToCreate,
          address: action.address,
        },
      };
    }

    case SIGN_UP_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        loading: false,
        userToCreate: INITIAL_STATE.userToCreate,
      };
    }

    case SIGN_UP_FAIL: {
      return {
        ...state,
        loading: false,
        userToCreate: INITIAL_STATE.userToCreate,
        error: action.error,
      };
    }

    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: {
          id: action.data.id,
          profile: action.data.authorities[0].authority,
          email: action.data.email,
          token: action.headers.authorization,
        },
        isAuthenticated: true,
      };
    }

    case SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.error,
      };

    case SIGN_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
