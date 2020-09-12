import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { ACTIONS } from '../../store/store';

export default function ProfileMenu({ anchorEl, setAnchorEl, storeDispatch }) {

  const handleClose = () => {
    setAnchorEl(null);
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
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
