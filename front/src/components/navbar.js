import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Toolbar, AppBar } from '@material-ui/core';

import { useStore, ACTIONS } from '../store/store';

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

export default function ButtonAppBar() {
    const classes = useStyles();
    const { store, storeDispatch } = useStore();

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
                        <Button color="inherit" onClick={() => storeDispatch({ type: ACTIONS.LOGIN, payload: { username: "Nordine", email: 'nordine@nordine.fr', access_token: "123" } })}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}