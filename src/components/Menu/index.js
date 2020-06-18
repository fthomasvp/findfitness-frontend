import React from 'react';
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

import * as AuthReducer from '../../store/ducks/Auth';

const Menu = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const { profile } = useSelector(state => state.auth.user);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
    <>
      <div style={{ width: '100%', height: '85%' }}>
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
    </>
  );
};

export default Menu;
