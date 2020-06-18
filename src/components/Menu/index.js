import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import ClassIcon from '@material-ui/icons/Class';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import * as AuthReducer from '../../store/ducks/Auth';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Menu = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { profile } = useSelector(state => state.auth.user);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => setOpenDrawer(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    switch (index) {
      case 0:
        return history.push('/studentgroup');

      case 1:
        return history.push('/chat');

      case 2:
        return history.push('/exercise');

      case 3:
        return history.push('/specialization');

      default:
        return history.push('/studentgroup');
    }
  };

  const handleLogoutClick = () => {
    dispatch(AuthReducer.signOut());

    history.replace('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu toolbar"
          onClick={() => setOpenDrawer(true)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          Menu
        </Typography>

        <IconButton
          edge="end"
          color="inherit"
          // onClick={() => setOpenDrawer(true)}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
        <List
          component="nav"
          aria-label="menu options"
          style={{ width: '250px' }}
        >
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Aulas" />
          </ListItem>
          {profile && profile !== 'ROLE_STUDENT' && (
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={event => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Atividades" />
            </ListItem>
          )}

          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
          {profile && profile !== 'ROLE_STUDENT' && (
            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={event => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Especializações" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Menu;

{
  /* <div style={{ width: '100%', height: '85%' }}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Aulas" />
          </ListItem>
          {profile && profile !== 'ROLE_STUDENT' && (
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={event => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Atividades" />
            </ListItem>
          )}

          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
          {profile && profile !== 'ROLE_STUDENT' && (
            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={event => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Especializações" />
            </ListItem>
          )}
        </List>
      </div>
      <div style={{ width: '100%', height: '15%' }}>
        <List>
          <ListItem button onClick={() => handleLogoutClick()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sair"></ListItemText>
          </ListItem>
        </List>
      </div>
    </> */
}
