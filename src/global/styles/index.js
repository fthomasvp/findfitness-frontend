import { makeStyles } from '@material-ui/core/styles';

export const useGlobalStyles = makeStyles(theme => ({
  toolbar: {
    background: '#08041f !important',
    color: `${theme.palette.grey[50]} !important`,
  },
  appBar: {
    background: '#18132c !important',
    color: `${theme.palette.grey[50]} !important`,
  },
  tabIndicator: {
    background: '#51389b !important',
    height: '6px !important',
  },
  textField: {
    background: '#08041f12 !important',
    marginBottom: '20px !important',
    marginTop: '0px !important',
  },
  inputLabel: {
    fontSize: '1rem !important',
  },
  formHelperText: {
    fontSize: '1.1rem !important',
  },
  primaryButton: {
    color: `${theme.palette.grey[50]} !important`,
    fontWeight: 'bold !important',
  },
  secondaryButton: {
    marginRight: theme.spacing(2),
  },
  primaryTypography: {
    fontSize: '1.2rem !important',
  },
}));
