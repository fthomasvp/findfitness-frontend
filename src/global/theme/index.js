import { createMuiTheme } from '@material-ui/core/styles';

import { grey } from '@material-ui/core/colors';

export const defaultTheme = createMuiTheme({
  overrides: {
    MuiTypography: {
      colorTextPrimary: '#08041f',
      colorTextSecondary: grey[800],
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#3b9eff',
    },
    background: {
      default: grey[300],
      paper: grey[100],
    },
    text: {
      primary: '#08041f',
    },
  },
});
