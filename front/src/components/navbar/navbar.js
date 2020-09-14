import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../store/store';
import { Button, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import ModalLogin from '../modal/modalLogin';
import ProfileMenu from './profileMenu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NavigationMenu from './navItems';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '8px',
        marginBottom: '30px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        backgroundColor: 'white',
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
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
            <AppBar className={classes.appBar} position="static" elevation={0}>
                <Toolbar>
                    <Typography variant="h4" color="primary" className={`${classes.title} ${classes.textleft}`}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} >Nentai</Link>
                    </Typography>
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}
                    >
                        <NavigationMenu />
                    </div>
                    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                        {store.user_loading ?
                            (<>
                                <Skeleton variant="text" width="13%" style={{ marginRight: '10px' }}></Skeleton>
                                <Skeleton variant="rect" width={40} height={40}></Skeleton>
                            </>)
                            :
                            (store.user
                                ?
                                (<>
                                    <Button
                                        ref={anchorEl}
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={() => setOpenMenu(true)}
                                        style={{ marginRight: '5px', color: 'rgba(0, 0, 0, 0.54)', textTransform: 'none', fontSize: '1.1rem' }}
                                    >
                                        {store.user.login}
                                        <ArrowDropDownIcon style={{ marginLeft: '3px' }} />
                                    </Button>
                                    <ProfileMenu anchorEl={anchorEl.current} openMenu={openMenu} setOpenMenu={setOpenMenu} storeDispatch={storeDispatch} store={store} />
                                    <Link to={`/profil/${store.user.id}`}>
                                        {store.user.avatar ? <Avatar variant="rounded" alt="profile-pic" src={store.user.avatar}></Avatar> : <Avatar>{store.user.login.charAt(0)}</Avatar>}
                                    </Link>
                                </>)
                                :
                                <Button onClick={handleClickOpen} style={{ color: 'rgba(0, 0, 0, 0.54)' }}>S'identifier</Button>
                            )
                        }
                    </div>

                </Toolbar>
            </AppBar>
            <ModalLogin isOpen={open} handleClose={handleClose} storeDispatch={storeDispatch} />
        </div>
    );
}