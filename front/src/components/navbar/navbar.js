import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../store/store';
import { Button, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ModalLogin from '../modal/modalLogin';
import ProfileMenu from './profileMenu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import NavigationMenu from './navItems';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    textleft: {
        textAlign: "left",
    }
}));

export default function NavBar() {
    const classes = useStyles();
    const [store, storeDispatch] = useStore();
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const anchorEl = useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={`${classes.title} ${classes.textleft}`}>
                        PreviouslyOn
                    </Typography>
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                        <NavigationMenu />
                    </div>
                    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                        {store.user_loading ?
                            (<>
                                <Skeleton variant="text" width="18%" style={{ marginRight: '10px' }}></Skeleton>
                                <Skeleton variant="circle" width={40} height={40}></Skeleton>
                            </>)
                            :
                            (store.user
                                ?
                                (<>
                                    <Button
                                        ref={anchorEl}
                                        color="inherit"
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={() => setOpenMenu(true)}
                                        style={{ marginRight: '5px' }}
                                    >
                                        {store.user.login}
                                        <ArrowDropDownIcon style={{ marginLeft: '3px' }} />
                                    </Button>
                                    <ProfileMenu anchorEl={anchorEl.current} openMenu={openMenu} setOpenMenu={setOpenMenu} storeDispatch={storeDispatch} />
                                    {store.user.avatar ? <Avatar alt="profile-pic" src={store.user.avatar}></Avatar> : <Avatar>{store.user.login.charAt(0)}</Avatar>}
                                </>)
                                :
                                <Button color="inherit" onClick={handleClickOpen}>Login</Button>
                            )
                        }
                    </div>

                </Toolbar>
            </AppBar>
            <ModalLogin isOpen={open} handleClose={handleClose} storeDispatch={storeDispatch} />
        </div>
    );
}