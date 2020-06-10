import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';

const Alert = ({ open, handleClose, growTransition, message, severity }) => {
  return (
    <Grow in={growTransition}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={severity === 'error' ? null : 6000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </Grow>
  );
};

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  growTransition: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
};

export default Alert;
