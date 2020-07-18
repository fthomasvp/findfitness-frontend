import { makeStyles } from '@material-ui/core';

export const useGlobalStyles = makeStyles(theme => ({
  toolbar: {
    background: '#08041f',
    color: theme.palette.grey[50],
  },
  appBar: {
    background: '#18132c',
    color: theme.palette.grey[50],
  },
  tabIndicator: {
    background: '#51389b',
    height: '6px',
  },
  textField: {
    background: '#08041f12',
    marginBottom: '20px',
    marginTop: '0px',
  },
  inputLabel: {
    fontSize: '1rem',
  },
  formHelperText: {
    fontSize: '1.1rem',
  },
  primaryButton: {
    color: theme.palette.grey[50],
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginRight: theme.spacing(2),
  },
  primaryTypography: {
    fontSize: '1.2rem',
  },
}));
