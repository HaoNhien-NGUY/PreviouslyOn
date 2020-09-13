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
        PaperProps={{
            style: {
              transform: `translateY(${anchorEl?.offsetHeight}px)`,
              width: anchorEl?.offsetWidth,
            },
            elevation: 3
        }}
        TransitionComponent={Fade}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profil</MenuItem>
        <MenuItem>Mes Amis</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
