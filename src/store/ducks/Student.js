/**
 * Action Types OR just Actions
 * */
export const FETCH_PAYMENT_METHODS_REQUEST =
  '@student/FETCH_PAYMENT_METHODS_REQUEST';
export const FETCH_PAYMENT_METHODS_SUCCESS =
  '@student/FETCH_PAYMENT_METHODS_SUCCESS';
export const FETCH_PAYMENT_METHODS_FAIL = '@student/FETCH_PAYMENT_METHODS_FAIL';

/**
 * Action Creators
 * */
export const fetchPaymentMethodsRequest = idStudent => {
  return {
    type: FETCH_PAYMENT_METHODS_REQUEST,
    idStudent,
  };
};

export const fetchPaymentMethodsSuccess = ({ data }) => {
  return {
    type: FETCH_PAYMENT_METHODS_SUCCESS,
    data,
  };
};

export const fetchPaymentMethodsFail = error => {
  return {
    type: FETCH_PAYMENT_METHODS_FAIL,
    error,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  loading: false,
  paymentMethods: [],
  error: null,
};

export const student = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PAYMENT_METHODS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PAYMENT_METHODS_SUCCESS: {
      const content = action.data;

      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        paymentMethods: content,
      };
    }

    case FETCH_PAYMENT_METHODS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
