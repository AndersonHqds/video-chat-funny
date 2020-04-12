import React from 'react';

import AppBar from './components/AppBar/AppBar';

import './App.css';

import VideoChat from './components/VideoChat/VideoChat';

const App: React.FC = () => {
  const [username, setUsernameToBar] = React.useState('');

  return (
    <div className="App">
      <AppBar username={username} />
      <VideoChat setUsernameToBar={setUsernameToBar} />
    </div>
  );
};

export default App;
