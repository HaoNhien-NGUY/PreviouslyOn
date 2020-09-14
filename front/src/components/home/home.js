import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    // },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function CenteredGrid() {
    const classes = useStyles();

    return (
        <Container maxWidth={'xl'}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>xs=2</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>xs=2</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>xs=2</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
            </Grid>
        </Container>
    );
}