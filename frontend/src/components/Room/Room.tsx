import React from 'react';
import Video, { Participant } from 'twilio-video';
import { Container, Fab, Grid, Card, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import ParticipantComponent from '../Participant/Participant';

import { useStyles } from './style';

interface IProps {
  roomName: string;
  token: string;
  handleLogout: (event: React.MouseEvent) => void;
}

const Room: React.FC<IProps> = ({ roomName, token, handleLogout }) => {
  const classes = useStyles();

  const [room, setRoom] = React.useState<Video.Room | null>(null);
  const [participants, setParticipants] = React.useState<Participant[]>([]);

  const remoteParticipants = participants.map((participant: Participant): any => (
    <ParticipantComponent key={participant.sid} participant={participant} />
  ));

  React.useEffect(() => {
    const participantConnected = (participant: Participant) => {
      setParticipants((prevParticipants: Participant[]) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant: Participant) => {
      setParticipants((prevParticipants: Participant[]) =>
        prevParticipants.filter((p: Participant) => p !== participant),
      );
    };

    Video.connect(token, {
      name: roomName,
    }).then((roomResponse: Video.Room) => {
      setRoom(roomResponse);
      roomResponse.on('participantConnected', participantConnected);
      roomResponse.on('participantDisconnected', participantDisconnected);
      roomResponse.participants.forEach(participantConnected);
    });

    return () => {
      setRoom((currentRoom: any) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach((trackPublication: any) => {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        }
        return currentRoom;
      });
    };
  }, [roomName, token]);

  return (
    <>
      <Grid container justify="flex-end" alignItems="center">
        <Typography className={classes.roomName}>Room: {roomName} </Typography>
        <Fab onClick={handleLogout} style={{ marginTop: '10px', marginRight: '20px' }} color="secondary">
          <Close />
        </Fab>
      </Grid>
      <Container className={classes.container}>
        <Card>
          <Grid
            container
            className={classes.containerGrid}
            justify="space-around"
            alignItems="center"
            style={{ minHeight: 400 }}
          >
            {room ? (
              <ParticipantComponent local key={room.localParticipant.sid} participant={room.localParticipant} />
            ) : (
              ''
            )}
            {remoteParticipants}
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default Room;
