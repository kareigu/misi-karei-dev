import React, { useEffect, useRef, useState, useContext } from 'react';
import { 
  MenuList, MenuItem , ClickAwayListener, 
  Popper, Paper, Grow, makeStyles, Avatar,
  IconButton
  } from '@material-ui/core';

import './UserMenu.css';
import UserContext from '../../utils/UserContext';
import { NavLink } from 'react-router-dom';
//import NavButton from '../NavButtons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: '2px',
  },
});

function UserMenu () {
  const classes = useStyles();
  const {user} = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <IconButton
        className="userButton"
        ref={anchorRef}
        onClick={handleToggle}
      >
        <Avatar src={user.avatar} alt={user.username} />
      </IconButton>

      <Popper className="userMenuPopper" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper elevation={5}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem onClick={handleClose}>
                    <div className="MenuOption">
                    <NavLink
                      to="tools"
                      activeStyle={{
                        borderBottomColor: "var(--select-color)"
                      }}
                    >
                      Tools
                    </NavLink>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <div className="MenuOption">
                      <NavLink
                        to="signout"
                        activeStyle={{
                          borderBottomColor: "var(--select-color)"
                        }}
                      >
                        Sign out
                      </NavLink>
                    </div>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>

  )
}

export default UserMenu;