import React from 'react';
import { Button, Grid, FormControl, InputLabel, Input, Card, Typography } from '@material-ui/core';
import { VoiceChat } from '@material-ui/icons';

import { useStyles } from './style';

interface IProps {
  username: string;
  roomName: string;
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRoomNameChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const Lobby: React.FC<IProps> = ({ username, roomName, handleUsernameChange, handleRoomNameChange, handleSubmit }) => {
  const classes = useStyles();

  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    const status = username?.length > 0 && roomName?.length > 0 ? false : true;
    setDisabled(status);
  }, [username, roomName]);

  return (
    <Grid className={classes.container} justify="center" alignContent="center" alignItems="center" container>
      <Card className={classes.cardForm}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <Typography color="secondary" variant="h5">
            Create room
          </Typography>
          <VoiceChat fontSize="large" color="secondary" className={classes.iconChat} />
          <FormControl>
            <InputLabel htmlFor="username">Name:</InputLabel>
            <Input id="username" value={username} onChange={handleUsernameChange} />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="roomName">Room Name:</InputLabel>
            <Input id="roomName" value={roomName} onChange={handleRoomNameChange} />
          </FormControl>
          <FormControl>
            <Button type="submit" disabled={disabled} variant="contained" color="secondary">
              Create
            </Button>
          </FormControl>
        </form>
      </Card>
    </Grid>
  );
};

export default Lobby;
