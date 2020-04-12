import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import { useStyles } from './style';

interface IProps {
  username: string;
}

const MenuAppBar: React.FC<IProps> = ({ username }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            VideoChatFunny
            <ChatBubbleIcon className={classes.bubbleIcon} />
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
              <Typography className={classes.userName} variant="caption">
                {username}
              </Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
