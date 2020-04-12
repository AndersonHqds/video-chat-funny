import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'flex',
    },
    bubbleIcon: {
      marginLeft: 20,
      alignSelf: 'center',
    },
    userName: {
      marginLeft: 20,
    },
  }),
);
