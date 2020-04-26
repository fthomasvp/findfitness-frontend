import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import ClassIcon from '@material-ui/icons/Class';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Menu = () => {
  let history = useHistory();

  const { profile } = useSelector(state => state.auth.user);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    if (index === 0) {
      history.push('/studentgroup');
    } else if (index === 1) {
      history.push('/chat');
    } else if (index === 2) {
      history.push('/exercise');
    } else {
      history.push('/specialization');
    }
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
            <>
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={event => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <FitnessCenterIcon />
                </ListItemIcon>
                <ListItemText primary="Exercícios" />
              </ListItem>
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
            </>
          )}
        </List>
      </div>
      <div style={{ width: '100%', height: '15%' }}>
        <List>
          <ListItem button onClick={() => history.push('/')}>
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
