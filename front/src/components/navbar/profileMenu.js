import React from 'react';
import { Menu, MenuItem, Fade } from '@material-ui/core';
import { ACTIONS } from '../../store/store';
import { Link, useHistory } from "react-router-dom";

export default function ProfileMenu({ anchorEl, setOpenMenu, openMenu, storeDispatch, store }) {
  const history = useHistory();

  const handleClose = () => {
    setOpenMenu(false);
  };

  const handleLogout = () => {
    storeDispatch({ type: ACTIONS.LOGOUT });
    handleClose();
  }

  const handleClick = () => {
    handleClose();
    history.push(`/profil/${store.user.id}`);
  }

  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
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
        <MenuItem onClick={() =>  handleClick(`/profil/${store.user.id}`) }>Profil</MenuItem>
        <MenuItem onClick={() =>  handleClick(`/friends/${store.user.id}`) }>Mes amis</MenuItem>
        <MenuItem onClick={() =>  handleClick(`/friends/${store.user.id}`) }>Paramètres</MenuItem>
        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
      </Menu>
    </>
  );
}
