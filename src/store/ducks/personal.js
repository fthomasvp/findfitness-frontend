/**
 * Action Types OR just Actions
 * */
export const FETCH_PERSONAL_STUDENT_GROUPS_REQUEST =
  '@personal/FETCH_PERSONAL_STUDENT_GROUPS_REQUEST';
export const FETCH_PERSONAL_STUDENT_GROUPS_SUCCESS =
  '@personal/FETCH_PERSONAL_STUDENT_GROUPS_SUCCESS';
export const FETCH_PERSONAL_STUDENT_GROUPS_FAIL =
  '@personal/FETCH_PERSONAL_STUDENT_GROUPS_FAIL';

export const CREATE_PERSONAL_EVALUATION_REQUEST =
  '@personal/CREATE_PERSONAL_EVALUATION_REQUEST';
export const CREATE_PERSONAL_EVALUATION_SUCCESS =
  '@personal/CREATE_PERSONAL_EVALUATION_SUCCESS';
export const CREATE_PERSONAL_EVALUATION_FAIL =
  '@personal/CREATE_PERSONAL_EVALUATION_FAIL';

/**
 * Action Creators
 * */
export const fetchPersonalStudentGroupsRequest = userId => {
  return {
    type: FETCH_PERSONAL_STUDENT_GROUPS_REQUEST,
    userId,
  };
};

export const fetchPersonalStudentGroupsSuccess = response => {
  return {
    type: FETCH_PERSONAL_STUDENT_GROUPS_SUCCESS,
    response,
  };
};

export const fetchPersonalStudentGroupsFail = error => {
  return {
    type: FETCH_PERSONAL_STUDENT_GROUPS_FAIL,
    error,
  };
};

export const createPersonalEvaluationRequest = (
  idStudentGroup,
  idPersonal,
  evaluation
) => {
  return {
    type: CREATE_PERSONAL_EVALUATION_REQUEST,
    idStudentGroup,
    idPersonal,
    evaluation,
  };
};

export const createPersonalEvaluationSuccess = response => {
  return {
    type: CREATE_PERSONAL_EVALUATION_SUCCESS,
    response,
  };
};

export const createPersonalEvaluationFail = error => {
  return {
    type: CREATE_PERSONAL_EVALUATION_FAIL,
    error,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  loading: false,
  studentGroupsFromPersonal: [],
  pagination: {
    page: 0,
    size: 20,
  },
  error: null,
  response: null,
};

export const personal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_STUDENT_GROUPS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PERSONAL_STUDENT_GROUPS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        response: action.response,
        studentGroupsFromPersonal: action.response.data,
      };
    }

    case FETCH_PERSONAL_STUDENT_GROUPS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
      };

    case CREATE_PERSONAL_EVALUATION_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CREATE_PERSONAL_EVALUATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        response: action.response,
      };
    }

    case CREATE_PERSONAL_EVALUATION_FAIL: {
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
