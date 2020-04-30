import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessageInput } from './styles';

const SErrorMessageInput = props => {
  const { message } = props;

  return <ErrorMessageInput>{message}</ErrorMessageInput>;
};

SErrorMessageInput.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  marginTop: PropTypes.string,
};

export default SErrorMessageInput;
