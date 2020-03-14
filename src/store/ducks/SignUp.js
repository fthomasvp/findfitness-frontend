/**
 * Action Types
 * */
export const STORE_PROFILE_TYPE = '@signup/STORE_PROFILE_TYPE';
export const STORE_PERSON_FORM = '@signup/STORE_PERSON_FORM';
export const STORE_ADDRESS_FORM = '@signup/STORE_ADDRESS_FORM';

export const SIGN_UP_REQUEST = '@signup/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = '@signup/SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = '@signup/SIGN_UP_FAIL';

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
      };
    }

    case SIGN_UP_FAIL: {
      return {
        ...state,
        loading: false,
        error: { ...action.error },
      };
    }

    default:
      return state;
  }
};
