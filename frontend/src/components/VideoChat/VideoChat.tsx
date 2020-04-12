import React from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';

import Lobby from '../Lobby/Lobby';
import Room from '../Room/Room';

interface IProps {
  setUsernameToBar: (name: string) => void;
}

const VideoChat: React.FC<IProps> = ({ setUsernameToBar }) => {
  const [username, setUsername] = React.useState<string>('');
  const [roomName, setRoomName] = React.useState<string>('');
  const [token, setToken] = React.useState<string | null>(null);

  const handleUsernameChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const body = {
        identity: username,
        room: roomName,
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const response: any = await axios.post('http://localhost:3001/video/token', body, { headers });
      setUsernameToBar(username);
      setToken(response.data.token);
    },
    [username, roomName, setUsernameToBar],
  );

  const handleLogout = React.useCallback((event: React.MouseEvent) => {
    setToken(null);
  }, []);

  return (
    <Container>
      {token ? (
        <Room handleLogout={handleLogout} token={token} roomName={roomName} />
      ) : (
        <Lobby
          roomName={roomName}
          username={username}
          handleRoomNameChange={handleRoomNameChange}
          handleUsernameChange={handleUsernameChange}
          handleSubmit={handleSubmit}
        />
      )}
    </Container>
  );
};

export default VideoChat;
