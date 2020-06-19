import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));
