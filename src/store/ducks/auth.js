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

export const FETCH_USER_DATA_REQUEST = '@auth/FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = '@auth/FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAIL = '@auth/FETCH_USER_DATA_FAIL';

export const PATCH_USER_DATA_REQUEST = '@auth/PATCH_USER_DATA_REQUEST';
export const PATCH_USER_DATA_SUCCESS = '@auth/PATCH_USER_DATA_SUCCESS';
export const PATCH_USER_DATA_FAIL = '@auth/PATCH_USER_DATA_FAIL';

export const PATCH_USER_ADDRESS_DATA_REQUEST =
  '@auth/PATCH_USER_ADDRESS_DATA_REQUEST';
export const PATCH_USER_ADDRESS_DATA_SUCCESS =
  '@auth/PATCH_USER_ADDRESS_DATA_SUCCESS';
export const PATCH_USER_ADDRESS_DATA_FAIL =
  '@auth/PATCH_USER_ADDRESS_DATA_FAIL';

export const UPDATE_ADDRESS_PROFILE_DATA = '@auth/UPDATE_ADDRESS_PROFILE_DATA';

export const PATCH_USER_HEALTH_CARD_DATA_REQUEST =
  '@auth/PATCH_USER_HEALTH_CARD_DATA_REQUEST';
export const PATCH_USER_HEALTH_CARD_DATA_SUCCESS =
  '@auth/PATCH_USER_HEALTH_CARD_DATA_SUCCESS';
export const PATCH_USER_HEALTH_CARD_DATA_FAIL =
  '@auth/PATCH_USER_HEALTH_CARD_DATA_FAIL';

export const CLEAR_FIELDS = '@auth/CLEAR_FIELDS';

export const CREATE_USER_HEALTH_CARD_REQUEST =
  '@auth/CREATE_USER_HEALTH_CARD_REQUEST';
export const CREATE_USER_HEALTH_CARD_SUCCESS =
  '@auth/CREATE_USER_HEALTH_CARD_SUCCESS';
export const CREATE_USER_HEALTH_CARD_FAIL =
  '@auth/CREATE_USER_HEALTH_CARD_FAIL';

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

export const updateAddressData = (response, states) => {
  return {
    type: UPDATE_ADDRESS_DATA,
    response,
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

export const fetchUserDataRequest = (profile, id) => {
  return {
    type: FETCH_USER_DATA_REQUEST,
    profile,
    id,
  };
};

export const fetchUserDataSuccess = response => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    response,
  };
};

export const fetchUserDataFail = error => {
  return {
    type: FETCH_USER_DATA_FAIL,
    error,
  };
};

export const patchUserDataRequest = (profile, userData) => {
  return {
    type: PATCH_USER_DATA_REQUEST,
    profile,
    userData,
  };
};

export const patchUserDataSuccess = response => {
  return {
    type: PATCH_USER_DATA_SUCCESS,
    response,
  };
};

export const patchUserDataFail = error => {
  return {
    type: PATCH_USER_DATA_FAIL,
    error,
  };
};

export const patchUserAddressDataRequest = (profile, id, userAddressData) => {
  return {
    type: PATCH_USER_ADDRESS_DATA_REQUEST,
    profile,
    id,
    userAddressData,
  };
};

export const patchUserAddressDataSuccess = response => {
  return {
    type: PATCH_USER_ADDRESS_DATA_SUCCESS,
    response,
  };
};

export const patchUserAddressDataFail = error => {
  return {
    type: PATCH_USER_ADDRESS_DATA_FAIL,
    error,
  };
};

export const updateAddressProfileData = (response, states) => {
  return {
    type: UPDATE_ADDRESS_PROFILE_DATA,
    response,
    states,
  };
};

export const patchUserHealthCardDataRequest = (id, userHealthCardData) => {
  return {
    type: PATCH_USER_HEALTH_CARD_DATA_REQUEST,
    id,
    userHealthCardData,
  };
};

export const patchUserHealthCardDataSuccess = response => {
  return {
    type: PATCH_USER_HEALTH_CARD_DATA_SUCCESS,
    response,
  };
};

export const patchUserHealthCardDataFail = error => {
  return {
    type: PATCH_USER_HEALTH_CARD_DATA_FAIL,
    error,
  };
};

export const clearFields = () => {
  return {
    type: CLEAR_FIELDS,
  };
};

export const createUserHealthCardRequest = (id, healthCard) => {
  return {
    type: CREATE_USER_HEALTH_CARD_REQUEST,
    id,
    healthCard,
  };
};

export const createUserHealthCardSuccess = response => {
  return {
    type: CREATE_USER_HEALTH_CARD_SUCCESS,
    response,
  };
};

export const createUserHealthCardFail = error => {
  return {
    type: CREATE_USER_HEALTH_CARD_FAIL,
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
  userToUpdate: {
    id: 0,
    address: {
      id: 0,
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      referenceLocation: '',
      city: '',
      state: '',
      zipcode: '',
    },
    birthdate: '',
    cpf: '',
    email: '',
    password: '',
    gender: 'F',
    name: '',
    phone: '',
    profilePicture: '',
    healthCard: {
      id: 0,
      sedentaryTime: '',
      regularPhysicalActivity: '',
      heartProblem: '',
      respiratoryAllergy: '',
      orthopedicProblem: '',
      surgicalIntervention: '',
      regularMedication: '',
      comments: '',
      diabetes: false,
      epilepsy: false,
      smoking: false,
      rheumatism: false,
      hypertension: false,
    },
    cref: '',
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
        state => state.name === action.response.data.state
      );

      const addressFromAPI = {
        street: action.response.data.street,
        neighborhood: action.response.data.neighborhood,
        city: action.response.data.city,
        state: myState.initials,
        zipcode: action.response.data.zipcode,
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

    case FETCH_USER_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        response: action.response,
        userToUpdate: {
          ...state.userToUpdate,
          ...action.response.data,
          healthCard:
            action.response.data.healthCard ||
            INITIAL_STATE.userToUpdate.healthCard,
          password: '',
        },
        user: {
          ...state.user,
          email: action.response.data.email,
          username: action.response.data.name,
          profilePicture: action.response.data.profilePicture,
        },
      };
    }

    case FETCH_USER_DATA_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
      };
    }

    case PATCH_USER_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case PATCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        response: action.response,
      };
    }

    case PATCH_USER_DATA_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
      };
    }

    case PATCH_USER_ADDRESS_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case PATCH_USER_ADDRESS_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        response: action.response,
      };
    }

    case PATCH_USER_ADDRESS_DATA_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
      };
    }

    case UPDATE_ADDRESS_PROFILE_DATA: {
      const myState = action.states.find(
        state => state.name === action.response.data.state
      );

      let addressFromAPI = {
        street: action.response.data.street,
        neighborhood: action.response.data.neighborhood,
        city: action.response.data.city,
        state: myState.initials,
        zipcode: action.response.data.zipcode,
      };

      return {
        ...state,
        userToUpdate: {
          ...state.userToUpdate,
          address: {
            ...state.userToUpdate.address,
            ...addressFromAPI,
          },
        },
      };
    }

    case PATCH_USER_HEALTH_CARD_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case PATCH_USER_HEALTH_CARD_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        response: action.response,
      };
    }

    case PATCH_USER_HEALTH_CARD_DATA_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
      };
    }

    case CREATE_USER_HEALTH_CARD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CREATE_USER_HEALTH_CARD_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        response: action.response,
      };
    }

    case CREATE_USER_HEALTH_CARD_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
      };
    }

    case CLEAR_FIELDS:
      return {
        ...state,
        activeStep: INITIAL_STATE.activeStep,
      };

    default:
      return state;
  }
};
