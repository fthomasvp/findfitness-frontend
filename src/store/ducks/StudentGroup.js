/**
 * Action Types OR just Actions
 * */
export const SEARCH_STUDENT_GROUP_REQUEST =
  '@studentGroup/SEARCH_STUDENT_GROUP_REQUEST';
export const SEARCH_STUDENT_GROUP_SUCCESS =
  '@studentGroup/SEARCH_STUDENT_GROUP_SUCCESS';
export const SEARCH_STUDENT_GROUP_FAIL =
  '@studentGroup/SEARCH_STUDENT_GROUP_FAIL';

export const STORE_FIRST_STEP_FORM = '@studentGroup/STORE_FIRST_STEP_FORM';
export const STORE_SECOND_STEP_FORM = '@studentGroup/STORE_SECOND_STEP_FORM';
export const STORE_THIRD_STEP_FORM = '@studentGroup/STORE_THIRD_STEP_FORM';

export const HANDLE_NEXT_STEP = '@studentGroup/HANDLE_NEXT_STEP';
export const HANDLE_BACK_STEP = '@studentGroup/HANDLE_BACK_STEP';

export const UPDATE_THIRD_STEP_DATA = '@studentGroup/UPDATE_THIRD_STEP_DATA';
export const UPDATE_THIRD_STEP_STATE_FIELD =
  '@studentGroup/UPDATE_THIRD_STEP_STATE_FIELD';

export const CLEAR_CREATE_STUDENT_GROUP_DATA =
  '@studentGroup/CLEAR_CREATE_STUDENT_GROUP_DATA';

export const CREATE_STUDENT_GROUP_REQUEST =
  '@studentGroup/CREATE_STUDENT_GROUP_REQUEST';

export const CREATE_STUDENT_GROUP_SUCCESS =
  '@studentGroup/CREATE_STUDENT_GROUP_SUCCESS';

export const CREATE_STUDENT_GROUP_FAIL =
  '@studentGroup/CREATE_STUDENT_GROUP_FAIL';

export const ENROLL_STUDENT_GROUP_REQUEST =
  '@studentGroup/ENROLL_STUDENT_GROUP_REQUEST';

export const ENROLL_STUDENT_GROUP_SUCCESS =
  '@studentGroup/ENROLL_STUDENT_GROUP_SUCCESS';

export const ENROLL_STUDENT_GROUP_FAIL =
  '@studentGroup/ENROLL_STUDENT_GROUP_FAIL';

/**
 * Action Creators
 * */
export const searchStudentGroupRequest = pagination => {
  return {
    type: SEARCH_STUDENT_GROUP_REQUEST,
    pagination,
  };
};

export const searchStudentGroupSuccess = ({ data }) => {
  return {
    type: SEARCH_STUDENT_GROUP_SUCCESS,
    data,
  };
};

export const searchStudentGroupFail = error => {
  return {
    type: SEARCH_STUDENT_GROUP_FAIL,
    error,
  };
};

export const storeFirstStepForm = firstStepData => {
  return {
    type: STORE_FIRST_STEP_FORM,
    firstStepData,
  };
};

export const storeSecondStepForm = secondStepData => {
  return {
    type: STORE_SECOND_STEP_FORM,
    secondStepData,
  };
};

export const storeThirdStepForm = thirdStepData => {
  return {
    type: STORE_THIRD_STEP_FORM,
    thirdStepData,
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

export const updateThirdStepData = ({ data }, states) => {
  return {
    type: UPDATE_THIRD_STEP_DATA,
    data,
    states,
  };
};

export const updateThirdStepStateField = selectedState => {
  return {
    type: UPDATE_THIRD_STEP_STATE_FIELD,
    selectedState,
  };
};

export const clearCreateStudentGroupData = () => {
  return {
    type: CLEAR_CREATE_STUDENT_GROUP_DATA,
  };
};

export const createStudentGroupRequest = studentGroup => {
  return {
    type: CREATE_STUDENT_GROUP_REQUEST,
    studentGroup,
  };
};

export const createStudentGroupSucess = () => {
  return {
    type: CREATE_STUDENT_GROUP_SUCCESS,
  };
};

export const createStudentGroupFail = error => {
  return {
    type: CREATE_STUDENT_GROUP_FAIL,
    error,
  };
};

export const enrollStudentGroupRequest = enrollData => {
  return {
    type: ENROLL_STUDENT_GROUP_REQUEST,
    enrollData,
  };
};

export const enrollStudentGroupSuccess = () => {
  return {
    type: ENROLL_STUDENT_GROUP_SUCCESS,
  };
};

export const enrollStudentGroupFail = error => {
  return {
    type: ENROLL_STUDENT_GROUP_FAIL,
    error,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  loading: false,
  activeStep: 0,
  createStudentGroup: {
    firstStepData: {
      contactPhone: '',
      minQtyStudents: 1,
      maxQtyStudents: 1,
      eventPrice: 0,
      selectedBeginDateTime: Date.now(),
      selectedEndDateTime: Date.now(),
    },
    secondStepData: [0],
    thirdStepData: {
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
  studentGroups: [],
  pagination: {
    page: 0,
    size: 20,
  },
  error: null,
};

export const studentGroup = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_STUDENT_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_STUDENT_GROUP_SUCCESS: {
      const { content } = action.data;

      return {
        ...state,
        loading: false,
        studentGroups: content,
      };
    }

    case SEARCH_STUDENT_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case STORE_FIRST_STEP_FORM: {
      const firstStepData = action.firstStepData;

      return {
        ...state,
        createStudentGroup: { ...state.createStudentGroup, firstStepData },
      };
    }

    case STORE_SECOND_STEP_FORM: {
      const secondStepData = action.secondStepData.map(exercise => exercise.id);

      return {
        ...state,
        createStudentGroup: { ...state.createStudentGroup, secondStepData },
      };
    }

    case STORE_THIRD_STEP_FORM: {
      const thirdStepData = action.thirdStepData;

      return {
        ...state,
        createStudentGroup: { ...state.createStudentGroup, thirdStepData },
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

    case UPDATE_THIRD_STEP_DATA: {
      // // Find the state object to return
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
        createStudentGroup: {
          ...state.createStudentGroup,
          thirdStepData: {
            ...state.createStudentGroup.thirdStepData,
            ...addressFromAPI,
          },
        },
      };
    }

    case UPDATE_THIRD_STEP_STATE_FIELD: {
      return {
        ...state,
        createStudentGroup: {
          ...state.createStudentGroup,
          thirdStepData: {
            ...state.createStudentGroup.thirdStepData,
            state: action.selectedState,
          },
        },
      };
    }

    case CLEAR_CREATE_STUDENT_GROUP_DATA: {
      return {
        ...state,
        activeStep: INITIAL_STATE.activeStep,
        createStudentGroup: INITIAL_STATE.createStudentGroup,
      };
    }

    case CREATE_STUDENT_GROUP_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CREATE_STUDENT_GROUP_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case CREATE_STUDENT_GROUP_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case ENROLL_STUDENT_GROUP_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case ENROLL_STUDENT_GROUP_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case ENROLL_STUDENT_GROUP_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};
