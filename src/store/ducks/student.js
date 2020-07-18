/**
 * Action Types OR just Actions
 * */
export const FETCH_PAYMENT_METHODS_REQUEST =
  '@student/FETCH_PAYMENT_METHODS_REQUEST';
export const FETCH_PAYMENT_METHODS_SUCCESS =
  '@student/FETCH_PAYMENT_METHODS_SUCCESS';
export const FETCH_PAYMENT_METHODS_FAIL = '@student/FETCH_PAYMENT_METHODS_FAIL';

export const FETCH_PAYMENTS_REQUEST = '@student/FETCH_PAYMENTS_REQUEST';
export const FETCH_PAYMENTS_SUCCESS = '@student/FETCH_PAYMENTS_SUCCESS';
export const FETCH_PAYMENTS_FAIL = '@student/FETCH_PAYMENTS_FAIL';

export const CREATE_PAYMENT_METHODS_REQUEST =
  '@student/CREATE_PAYMENT_METHODS_REQUEST';
export const CREATE_PAYMENT_METHODS_SUCCESS =
  '@student/CREATE_PAYMENT_METHODS_SUCCESS';
export const CREATE_PAYMENT_METHODS_FAIL =
  '@student/CREATE_PAYMENT_METHODS_FAIL';

export const CLEAR_SNACKBAR = '@student/CLEAR_SNACKBAR';

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

export const fetchPaymentsRequest = (idStudent, pagination) => {
  return {
    type: FETCH_PAYMENTS_REQUEST,
    idStudent,
    pagination,
  };
};

export const fetchPaymentsSuccess = ({ data }) => {
  return {
    type: FETCH_PAYMENTS_SUCCESS,
    data,
  };
};

export const fetchPaymentsFail = error => {
  return {
    type: FETCH_PAYMENTS_FAIL,
    error,
  };
};

export const createPaymentMethodsRequest = (idStudent, paymentMethod) => {
  return {
    type: CREATE_PAYMENT_METHODS_REQUEST,
    idStudent,
    paymentMethod,
  };
};

export const createPaymentMethodsSuccess = response => {
  return {
    type: CREATE_PAYMENT_METHODS_SUCCESS,
    response,
  };
};

export const createPaymentMethodsFail = error => {
  return {
    type: CREATE_PAYMENT_METHODS_FAIL,
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
  paymentMethods: [],
  paymentMethodToCreate: {
    cardNumber: '',
    cardOwnerName: '',
    expiryDate: new Date(),
    cardVerificationValue: '',
  },
  payments: [],
  pagination: {
    page: 0,
    size: 20,
  },
  response: null,
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
        response: INITIAL_STATE.response,
      };

    case FETCH_PAYMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PAYMENTS_SUCCESS: {
      const { content } = action.data;

      return {
        ...state,
        loading: false,
        error: INITIAL_STATE.error,
        payments: content,
      };
    }

    case FETCH_PAYMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
      };

    case CREATE_PAYMENT_METHODS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PAYMENT_METHODS_SUCCESS: {
      return {
        ...state,
        loading: false,
        paymentMethodToCreate: INITIAL_STATE.paymentMethodToCreate,
        error: INITIAL_STATE.error,
        response: action.response,
      };
    }

    case CREATE_PAYMENT_METHODS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        response: INITIAL_STATE.response,
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
