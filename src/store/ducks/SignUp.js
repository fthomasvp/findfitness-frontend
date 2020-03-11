/**
 * Action Types
 * */
// export const SIGN_UP_REQUEST = '@signup/SIGN_UP_REQUEST';
// export const SIGN_UP_SUCCESS = '@signup/SIGN_UP_SUCCESS';
// export const SIGN_UP_FAIL = '@signup/SIGN_UP_FAIL';
export const UPDATE_PROFILE_TYPE = '@signup/UPDATE_PROFILE_TYPE';
export const UPDATE_PERSON_FORM = '@signup/UPDATE_PERSON_FORM';
export const UPDATE_ADDRESS_FORM = '@signup/UPDATE_ADDRESS_FORM';

/**
 * Action Creators
 * */
export const updateProfileType = profileType => {
  return {
    type: UPDATE_PROFILE_TYPE,
    profileType,
  };
};

export const updatePersonForm = person => {
  return {
    type: UPDATE_PERSON_FORM,
    person,
  };
};

export const updateAddressForm = address => {
  return {
    type: UPDATE_ADDRESS_FORM,
    address,
  };
};

// export const signUpRequest = userToCreate => {
//   return {
//     type: SIGN_UP_REQUEST,
//     userToCreate,
//   };
// };

// export const signUpSuccess = ({ data, headers }) => {
//   return {
//     type: SIGN_UP_SUCCESS,
//     data,
//     headers,
//   };
// };

// export const signUpFail = error => {
//   return {
//     type: SIGN_UP_FAIL,
//     error,
//   };
// };

/**
 * Reducer
 * */
const initialState = {
  loading: false,
  userToCreate: {
    profileType: 'STUDENT',
    personal: {
      name: '',
      cref: '',
      phone: '',
      cpf: '',
      password: '',
      gender: 'M',
      birthdate: '',
      email: '',
    },
    student: {
      name: '',
      phone: '',
      cpf: '',
      password: '',
      gender: 'M',
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

export const signUp = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_TYPE:
      return {
        ...state,
        userToCreate: {
          ...state.userToCreate,
          profileType: action.profileType,
        },
      };

    case UPDATE_PERSON_FORM: {
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

    case UPDATE_ADDRESS_FORM: {
      return {
        ...state,
        userToCreate: {
          ...state.userToCreate,
          address: action.address,
        },
      };
    }

    // case SIGN_UP_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     user: action.payload,
    //   };

    // case SIGN_UP_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     user: {
    //       email: action.data.email,
    //       profile: action.data.authorities[0].authority,
    //     },
    //     isAuthenticated: true,
    //   };

    // case SIGN_UP_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //     isAuthenticated: false,
    //     error: { ...action.error, description: 'Email ou Senha inválido' },
    //   };

    default:
      return state;
  }
};
