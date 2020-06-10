/**
 * Action Types OR just Actions
 * */
export const FETCH_STATES_REQUEST = '@localization/FETCH_STATES_REQUEST';
export const FETCH_STATES_SUCCESS = '@localization/FETCH_STATES_SUCCESS';
export const FETCH_STATES_FAIL = '@localization/FETCH_STATES_FAIL';

export const SEARCH_ADDRESS_BY_ZIPCODE_REQUEST =
  '@localization/SEARCH_ADDRESS_BY_ZIPCODE_REQUEST';
export const SEARCH_ADDRESS_BY_ZIPCODE_FAIL =
  '@localization/SEARCH_ADDRESS_BY_ZIPCODE_FAIL';

export const FETCH_CITIES_BY_STATE_ID_REQUEST =
  '@localization/FETCH_CITIES_BY_STATE_ID_REQUEST';
export const FETCH_CITIES_BY_STATE_ID_SUCCESS =
  '@localization/FETCH_CITIES_BY_STATE_ID_SUCCESS';
export const FETCH_CITIES_BY_STATE_ID_FAIL =
  '@localization/FETCH_CITIES_BY_STATE_ID_FAIL';

export const CLEAR_SNACKBAR = '@localization/CLEAR_SNACKBAR';

/**
 * Action Creators
 * */
export const fetchStatesRequest = () => {
  return {
    type: FETCH_STATES_REQUEST,
  };
};

export const fetchStatesSuccess = ({ data }) => {
  return {
    type: FETCH_STATES_SUCCESS,
    data,
  };
};

export const fetchStatesFail = error => {
  return {
    type: FETCH_STATES_FAIL,
    error,
  };
};

export const searchAddressByZipcodeRequest = (zipcode, states, fromPage) => {
  return {
    type: SEARCH_ADDRESS_BY_ZIPCODE_REQUEST,
    zipcode,
    states,
    fromPage,
  };
};

export const searchAddressByZipcodeFail = error => {
  return {
    type: SEARCH_ADDRESS_BY_ZIPCODE_FAIL,
    error,
  };
};

export const fetchCitiesByStateIdRequest = selectedState => {
  return {
    type: FETCH_CITIES_BY_STATE_ID_REQUEST,
    selectedState,
  };
};

export const fetchCitiesByStateIdSuccess = ({ data }) => {
  return {
    type: FETCH_CITIES_BY_STATE_ID_SUCCESS,
    data,
  };
};

export const fetchCitiesByStateIdFail = error => {
  return {
    type: FETCH_CITIES_BY_STATE_ID_FAIL,
    error,
  };
};

export const clearSnackbar = () => {
  return {
    type: CLEAR_SNACKBAR,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  loading: false,
  states: [],
  citiesByState: [],
  error: null,
  response: null,
};

export const localization = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_STATES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_STATES_SUCCESS: {
      const content = action.data;

      return {
        ...state,
        loading: false,
        states: content,
      };
    }

    case FETCH_STATES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case SEARCH_ADDRESS_BY_ZIPCODE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case FETCH_CITIES_BY_STATE_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CITIES_BY_STATE_ID_SUCCESS: {
      const cities = action.data;

      return {
        ...state,
        loading: false,
        citiesByState: cities,
      };
    }

    case FETCH_CITIES_BY_STATE_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CLEAR_SNACKBAR:
      return {
        ...state,
        error: INITIAL_STATE.error,
        response: INITIAL_STATE.response,
      };

    default:
      return state;
  }
};
