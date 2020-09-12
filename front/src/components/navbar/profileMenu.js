import React from 'react';
import { Menu, MenuItem, Fade } from '@material-ui/core';
import { ACTIONS } from '../../store/store';

export default function ProfileMenu({ anchorEl, setOpenMenu, openMenu, storeDispatch }) {

  const handleClose = () => {
    setOpenMenu(false);
  };

  const handleLogout = () => {
    storeDispatch({ type: ACTIONS.LOGOUT });
    handleClose();
  }

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        // keepMounted
        PaperProps={{
            style: {
              transform: `translateY(${anchorEl?.offsetHeight}px)`,
              width: anchorEl?.offsetWidth,
            },
        }}
        TransitionComponent={Fade}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
