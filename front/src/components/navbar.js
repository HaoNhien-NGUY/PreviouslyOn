import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Toolbar , AppBar} from '@material-ui/core';

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

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={`${classes.title} ${classes.textleft}`}>
                        PreviouslyOn
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}