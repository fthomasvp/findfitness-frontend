import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './styles';

const SInput = props => {
  return <Input {...props} />;
};

SInput.propTypes = {
  maxLength: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default SInput;
