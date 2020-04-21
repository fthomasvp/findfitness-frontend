/**
 * Action Types OR just Actions
 * */
export const SEARCH_STUDENT_GROUP_REQUEST =
  '@studentGroup/SEARCH_STUDENT_GROUP_REQUEST';
export const SEARCH_STUDENT_GROUP_SUCCESS =
  '@studentGroup/SEARCH_STUDENT_GROUP_SUCCESS';
export const SEARCH_STUDENT_GROUP_FAIL =
  '@studentGroup/SEARCH_STUDENT_GROUP_FAIL';

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

/**
 * Reducer
 * */
const INITIAL_STATE = {
  loading: false,
  studentGroups: [],
  pagination: {
    page: 0,
    size: 10,
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

    default:
      return state;
  }
};
