import React from 'react';

import { Container, Fab, Grid, Card, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { useStyles } from './style';

interface IProps {
  roomName: string;
  token: string;
  handleLogout: (event: React.MouseEvent) => void;
}

const Room: React.FC<IProps> = ({ roomName, token, handleLogout }) => {
  const classes = useStyles();

  const [room, setRoom] = React.useState<string | null>(null);
  const [participants, setParticipants] = React.useState<[]>([]);

  return (
    <Container className={classes.container}>
      <Card>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography className={classes.roomName}>Room: {roomName} </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fab onClick={handleLogout} style={{ marginTop: '10px' }} color="secondary">
              <Close />
            </Fab>
          </Grid>
          <Grid item xs={4}>
            A
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Room;
