import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../store/store';
import { Button, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ModalLogin from '../modal/modalLogin';
import ProfileMenu from './profileMenu';

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
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleProfileMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={`${classes.title} ${classes.textleft}`}>
                        PreviouslyOn
                    </Typography>
                    {store.user_loading ?
                        (<>
                            <Skeleton variant="text" width="10%" style={{ marginRight: '10px' }}></Skeleton>
                            <Skeleton variant="circle" width={40} height={40}></Skeleton>
                        </>)
                        :
                        (store.user
                            ?
                            (<>
                                <Button 
                                color="inherit" 
                                aria-controls="simple-menu" 
                                aria-haspopup="true" 
                                onClick={handleProfileMenuClick} 
                                style={{ marginRight: '10px' }} >
                                    {store.user.login}
                                </Button>
                                <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} storeDispatch={storeDispatch} />
                                {store.user.avatar ? <Avatar alt="profile-pic" src={store.user.avatar}></Avatar> : <Avatar>{store.user.login.charAt(0)}</Avatar>}
                            </>)
                            :
                            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
                        )
                    }
                </Toolbar>
            </AppBar>
            <ModalLogin isOpen={open} handleClickOpen={handleClickOpen} handleClose={handleClose} storeDispatch={storeDispatch} />
        </div>
    );
}