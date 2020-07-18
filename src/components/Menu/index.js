import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ListIcon from '@material-ui/icons/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
import PaymentIcon from '@material-ui/icons/Payment';

import * as AuthReducer from '../../store/ducks/auth';
import { useGlobalStyles } from '../../global/styles';
import { useStyles } from './styles';

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  const { profilePicture, username } = useSelector(state => state.auth.user);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageTitle, setPageTitle] = useState('Aulas disponíveis');

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

      case 4:
        return history.push('/profile');

      case 5:
        return history.push('/paymentmethod');

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
      case '/home': {
        setSelectedIndex(0);

        return setPageTitle('Aulas disponíveis');
      }

      case '/studentgroups': {
        setSelectedIndex(1);
        return setPageTitle('Minhas aulas');
      }

      case '/activities': {
        setSelectedIndex(2);
        return setPageTitle('Atividades');
      }

      case '/specializations': {
        setSelectedIndex(3);
        return setPageTitle('Especializações');
      }

      case '/profile': {
        setSelectedIndex(4);
        return setPageTitle('Perfil');
      }

      case '/paymentmethod': {
        setSelectedIndex(5);
        return setPageTitle('Pagamento');
      }

      default: {
        setSelectedIndex(0);
        return setPageTitle('Aulas disponíveis');
      }
    }
  };

  /**
   * Effects
   */
  useEffect(() => {
    getPageTitle(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <AppBar
      position="static"
      className={globalClasses.appBar}
      style={{ marginBottom: '10px' }}
    >
      <Toolbar className={globalClasses.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu toolbar"
          onClick={() => setOpenDrawer(true)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" align="left" className={classes.title}>
          {pageTitle}
        </Typography>

        <Typography variant="button" align="right" className={classes.title}>
          Olá, {username}
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
            src={`${profilePicture}?${Date.now()}`}
            className={classes.large}
          ></Avatar>
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
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Aulas disponíveis" />
          </ListItem>

          <Divider style={{ marginBottom: '5px', marginTop: '5px' }} />

          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Minhas aulas" />
          </ListItem>

          {/* {profile && profile !== 'ROLE_STUDENT' && (
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
          )} */}

          <Divider style={{ marginBottom: '5px', marginTop: '5px' }} />

          <ListItem
            button
            selected={selectedIndex === 5}
            onClick={event => handleListItemClick(event, 5)}
          >
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Pagamento" />
          </ListItem>

          <Divider style={{ marginBottom: '5px', marginTop: '5px' }} />

          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={event => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Menu;
