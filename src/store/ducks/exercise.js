/**
 * Action Types OR just Actions
 * */
export const SEARCH_EXERCISES_REQUEST = '@exercise/SEARCH_EXERCISES_REQUEST';
export const SEARCH_EXERCISES_SUCCESS = '@exercise/SEARCH_EXERCISES_SUCCESS';
export const SEARCH_EXERCISES_FAIL = '@exercise/SEARCH_EXERCISES_FAIL';

/**
 * Action Creators
 * */
export const searchExercisesRequest = pagination => {
  return {
    type: SEARCH_EXERCISES_REQUEST,
    pagination,
  };
};

export const searchExercisesSuccess = ({ data }) => {
  return {
    type: SEARCH_EXERCISES_SUCCESS,
    data,
  };
};

export const searchExercisesFail = error => {
  return {
    type: SEARCH_EXERCISES_FAIL,
    error,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  loading: false,
  exercises: [],
  pagination: {
    page: 0,
    size: 20,
  },
  error: null,
};

export const exercise = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_EXERCISES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_EXERCISES_SUCCESS: {
      const { content } = action.data;

      return {
        ...state,
        loading: false,
        exercises: content,
      };
    }

    case SEARCH_EXERCISES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
