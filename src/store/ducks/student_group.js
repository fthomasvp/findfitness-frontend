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

export const CLEAR_SNACKBAR = '@studentGroup/CLEAR_SNACKBAR';

export const CREATE_STUDENT_EVALUATION_REQUEST =
  '@studentGroup/CREATE_STUDENT_EVALUATION_REQUEST';

export const CREATE_STUDENT_EVALUATION_SUCCESS =
  '@studentGroup/CREATE_STUDENT_EVALUATION_SUCCESS';

export const CREATE_STUDENT_EVALUATION_FAIL =
  '@studentGroup/CREATE_STUDENT_EVALUATION_FAIL';

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

export const updateThirdStepData = (response, states) => {
  return {
    type: UPDATE_THIRD_STEP_DATA,
    response,
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

export const createStudentGroupRequest = (studentGroup, idPersonal) => {
  return {
    type: CREATE_STUDENT_GROUP_REQUEST,
    studentGroup,
    idPersonal,
  };
};

export const createStudentGroupSucess = response => {
  return {
    type: CREATE_STUDENT_GROUP_SUCCESS,
    response,
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

export const enrollStudentGroupSuccess = response => {
  return {
    type: ENROLL_STUDENT_GROUP_SUCCESS,
    response,
  };
};

export const enrollStudentGroupFail = error => {
  return {
    type: ENROLL_STUDENT_GROUP_FAIL,
    error,
  };
};

export const clearSnackbar = () => {
  return {
    type: CLEAR_SNACKBAR,
  };
};

export const createStudentEvaluationRequest = (
  idStudentGroup,
  idStudent,
  evaluation
) => {
  return {
    type: CREATE_STUDENT_EVALUATION_REQUEST,
    idStudentGroup,
    idStudent,
    evaluation,
  };
};

export const createStudentEvaluationSuccess = response => {
  return {
    type: CREATE_STUDENT_EVALUATION_SUCCESS,
    response,
  };
};

export const createStudentEvaluationFail = error => {
  return {
    type: CREATE_STUDENT_EVALUATION_FAIL,
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
    size: 30,
  },
  error: null,
  response: null,
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

    case CREATE_STUDENT_GROUP_SUCCESS: {
      return {
        ...state,
        response: action.response,
        error: INITIAL_STATE.error,
      };
    }

    case CREATE_STUDENT_GROUP_FAIL: {
      return {
        ...state,
        error: action.error,
        response: INITIAL_STATE.response,
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
        error: INITIAL_STATE.error,
        response: action.response,
      };
    }

    case ENROLL_STUDENT_GROUP_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
      };
    }

    case CLEAR_SNACKBAR:
      return {
        ...state,
        error: INITIAL_STATE.error,
        response: INITIAL_STATE.response,
      };

    case CREATE_STUDENT_EVALUATION_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CREATE_STUDENT_EVALUATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        response: action.response,
      };
    }

    case CREATE_STUDENT_EVALUATION_FAIL: {
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
