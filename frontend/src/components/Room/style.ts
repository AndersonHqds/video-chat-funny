import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardForm: {
      width: 300,
    },
    container: {
      paddingTop: 20,
    },
    containerGrid: {
      background: '#ffedf4',
    },
    iconChat: {
      fontSize: 60,
    },
    nameContainer: {
      height: 100,
      paddingTop: 50,
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
    participants: {
      width: 300,
      height: 300,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: 50,
    },
  }),
);
