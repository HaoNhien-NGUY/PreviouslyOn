import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';

import PosterCard from '../card/posterCard';

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
                    <PosterCard />
                </Grid>
                <Grid item xs={2}>
                    <PosterCard />
                </Grid>
                <Grid item xs={2}>
                    <PosterCard />
                </Grid>
                <Grid item xs={2}>
                    <PosterCard />
                </Grid>
                <Grid item xs={2}>
                    <PosterCard />
                </Grid>
                <Grid item xs={2}>
                    <PosterCard />
                </Grid>
            </Grid>
        </Container>
    );
}