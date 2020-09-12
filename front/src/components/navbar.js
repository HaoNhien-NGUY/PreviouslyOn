import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStore, ACTIONS } from '../store/store';
import { Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import ModalLogin from './modal/modalLogin';

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
                    {store.user
                        ?
                        <Button color="inherit" onClick={() => storeDispatch({ type: ACTIONS.LOGOUT })}>Logout</Button>
                        :
                        <Button color="inherit" onClick={handleClickOpen}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <ModalLogin isOpen={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </div>
    );
}