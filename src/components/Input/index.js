import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './styles';

const SInput = props => {
  const { maxLength } = props;

  return <Input maxLength={maxLength} {...props} />;
};

SInput.propTypes = {
  maxLength: PropTypes.string.isRequired,
  height: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default SInput;
