import React from 'react';
import { Menu, MenuItem, Fade } from '@material-ui/core';
import { ACTIONS } from '../../store/store';
import { Link } from "react-router-dom";

export default function ProfileMenu({ anchorEl, setOpenMenu, openMenu, storeDispatch, store }) {
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
            border: 'solid rgba(0, 0, 0, 0.24) 1px',
          },
          elevation: 1
        }}
        TransitionComponent={Fade}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/profil/${store.user.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>Profil</Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/friends/${store.user.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>Mes amis</Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/friends/${store.user.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>Paramètres</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
      </Menu>
    </>
  );
}
