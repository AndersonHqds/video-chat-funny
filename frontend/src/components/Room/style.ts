import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardForm: {
      width: 300,
    },
    container: {
      paddingTop: 80,
    },
    iconChat: {
      fontSize: 60,
    },
    roomName: {
      fontWeight: 'bold',
      marginLeft: 10,
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#FFF',
      padding: 50,
    },
  }),
);
