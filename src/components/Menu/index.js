import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
// import ChatIcon from '@material-ui/icons/Chat';
import ClassIcon from '@material-ui/icons/Class';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';

import * as AuthReducer from '../../store/ducks/Auth';
import { useStyles } from './styles';

const Menu = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { profile } = useSelector(state => state.auth.user);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageTitle, setPageTitle] = useState('Tela inicial');

  const handleCloseDrawer = () => setOpenDrawer(false);

  const handleCloseProfileMenu = () => setOpenProfileMenu(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    setOpenDrawer(false);

    switch (index) {
      case 0:
        return history.push('/home');

      case 1:
        return history.push('/studentgroups');

      case 2:
        return history.push('/activities');

      case 3:
        return history.push('/specializations');

      default:
        return history.push('/home');
    }
  };

  const handleLogoutClick = () => {
    dispatch(AuthReducer.signOut());

    history.replace('/');
  };

  const getPageTitle = pathname => {
    switch (pathname) {
      case '/home':
        return setPageTitle('Tela inicial');

      case '/studentgroups':
        return setPageTitle('Minhas aulas');

      case '/activities':
        return setPageTitle('Atividades');

      case '/specializations':
        return setPageTitle('Especializações');

      default:
        return setPageTitle('Tela inicial');
    }
  };

  /**
   * Effects
   */
  useEffect(() => {
    getPageTitle(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <AppBar position="static" style={{ marginBottom: '10px' }}>
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

        <Typography variant="h6" align="center" className={classes.title}>
          {pageTitle}
        </Typography>

        <IconButton
          edge="end"
          color="inherit"
          onClick={event => {
            setOpenProfileMenu(true);

            setAnchorEl(event.currentTarget || null);
          }}
        >
          <Avatar
            alt="Profile picture"
            // src="/static/images/avatar/1.jpg"
            className={classes.large}
          >
            F
          </Avatar>
          <Popper
            open={openProfileMenu}
            anchorEl={anchorEl}
            role={undefined}
            transition
            // disablePortal // When commented, it will fit in the body content
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfileMenu}>
                    <MenuList
                      autoFocusItem={openProfileMenu}
                      id="profileMenuList"
                    >
                      <MenuItem onClick={handleCloseProfileMenu}>
                        <ListItemText primary="Meu perfil" />
                      </MenuItem>

                      <Divider />

                      <MenuItem onClick={handleLogoutClick}>
                        <ListItemIcon>
                          <ExitToAppIcon fontSize="default" />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </IconButton>
      </Toolbar>

      <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
        <List
          component="nav"
          aria-label="menu options"
          style={{ width: '300px' }}
        >
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Tela inicial" />
          </ListItem>

          <Divider style={{ marginBottom: '5px', marginTop: '5px' }} />

          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Minhas aulas" />
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

          {/* <ListItem
            button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem> */}

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
