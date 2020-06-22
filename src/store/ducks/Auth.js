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

export const UPDATE_ADDRESS_DATA = '@auth/UPDATE_ADDRESS_DATA';

export const HANDLE_NEXT_STEP = '@auth/HANDLE_NEXT_STEP';
export const HANDLE_BACK_STEP = '@auth/HANDLE_BACK_STEP';

export const CLEAR_SNACKBAR = '@auth/CLEAR_SNACKBAR';

export const UPLOAD_PROFILE_PICTURE_REQUEST =
  '@auth/UPLOAD_PROFILE_PICTURE_REQUEST';

export const UPLOAD_PROFILE_PICTURE_SUCCESS =
  '@auth/UPLOAD_PROFILE_PICTURE_SUCCESS';

export const UPLOAD_PROFILE_PICTURE_FAIL = '@auth/UPLOAD_PROFILE_PICTURE_FAIL';

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

export const signUpSuccess = response => {
  return {
    type: SIGN_UP_SUCCESS,
    response,
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

export const updateAddressData = ({ data }, states) => {
  return {
    type: UPDATE_ADDRESS_DATA,
    data,
    states,
  };
};

export const handleNextStep = activeStep => {
  return {
    type: HANDLE_NEXT_STEP,
    activeStep,
  };
};

export const handleBackStep = activeStep => {
  return {
    type: HANDLE_BACK_STEP,
    activeStep,
  };
};

export const clearSnackbar = () => {
  return {
    type: CLEAR_SNACKBAR,
  };
};

export const uploadProfilePictureRequest = (formData, profile, id) => {
  return {
    type: UPLOAD_PROFILE_PICTURE_REQUEST,
    formData,
    profile,
    id,
  };
};

export const uploadProfilePictureSuccess = response => {
  return {
    type: UPLOAD_PROFILE_PICTURE_SUCCESS,
    response,
  };
};

export const uploadProfilePictureFail = error => {
  return {
    type: UPLOAD_PROFILE_PICTURE_FAIL,
    error,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  loading: false,
  user: {},
  steps: ['Perfil', 'Dados pessoais', 'Endereço'],
  activeStep: 0,
  isAuthenticated: false,
  userToCreate: {
    profileType: 'STUDENT',
    personal: {
      name: '',
      cref: '',
      phone: '',
      cpf: '',
      password: '',
      gender: 'F',
      birthdate: '',
      email: '',
      validCref: false,
    },
    student: {
      name: '',
      phone: '',
      cpf: '',
      password: '',
      gender: 'F',
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
  response: null,
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
        error: INITIAL_STATE.error,
        response: action.response,
        userToCreate: INITIAL_STATE.userToCreate,
        activeStep: INITIAL_STATE.activeStep,
      };
    }

    case SIGN_UP_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
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
        error: INITIAL_STATE.error,
        response: action.response,
        user: {
          id: action.data.id,
          profile: action.data.authorities[0].authority,
          email: action.data.email,
          username: action.data.name,
          profilePicture: action.data.profilePicture,
          token: action.headers.authorization,
        },
        isAuthenticated: true,
      };
    }

    case SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
        isAuthenticated: false,
      };

    case SIGN_OUT:
      return INITIAL_STATE;

    case UPDATE_ADDRESS_DATA: {
      // Find the state object to return
      const myState = action.states.find(
        state => state.name === action.data.state
      );

      let addressFromAPI = {
        street: action.data.street,
        neighborhood: action.data.neighborhood,
        city: action.data.city,
        state: myState,
        zipcode: action.data.zipcode,
      };

      return {
        ...state,
        userToCreate: {
          ...state.userToCreate,
          address: {
            ...state.userToCreate.address,
            ...addressFromAPI,
          },
        },
      };
    }

    case HANDLE_NEXT_STEP: {
      const newActiveStep = action.activeStep + 1;

      return {
        ...state,
        activeStep: newActiveStep,
      };
    }

    case HANDLE_BACK_STEP: {
      const newActiveStep = action.activeStep - 1;

      return {
        ...state,
        activeStep: newActiveStep,
      };
    }

    case CLEAR_SNACKBAR:
      return {
        ...state,
        error: INITIAL_STATE.error,
        response: INITIAL_STATE.response,
      };

    case UPLOAD_PROFILE_PICTURE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case UPLOAD_PROFILE_PICTURE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        response: action.response,
        user: {
          ...state.user,
          profilePicture: action.response.data,
        },
      };
    }

    case UPLOAD_PROFILE_PICTURE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
      };
    }

    default:
      return state;
  }
};
