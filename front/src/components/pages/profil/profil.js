import React, { useEffect, useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Container, Grid, Paper, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { betaseriesAPI } from '../../../services/betaseriesAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    upperCase: {
        // textTransform: 'upperCase',
    },
    large: {
        width: '100%',
        height: '100%',
    },
}));

export default function Profil() {
    const [userInfo, setUserInfo] = useState(null);
    const classes = useStyles();

    let idUser = useRouteMatch("/profil/:id").params.id;

    useEffect(() => {
        betaseriesAPI.getUserInfoById(idUser).then(res => {
            console.log(res);
            setUserInfo(res.data.member);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <>
            { userInfo !== null &&
                <Container maxWidth={'lg'}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                Resumé de <span className={classes.upperCase}>{userInfo.login}</span>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            {/* <Paper className={classes.paper}>xs=6</Paper> */}
                            <Paper className={classes.paper}>
                                <Avatar variant="rounded" alt="profile-pic" src={userInfo.avatar} className={classes.large}>

                                </Avatar>
                                {/* <img src={userInfo.avatar} alt="Avatar" /> */}
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <span>{userInfo.stats.episodes}<br />ÉPISODE</span>
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <span>{userInfo.xp}<br />XP</span>
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <span>{userInfo.stats.badges}<br />BADGES</span>
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <span>{userInfo.stats.friends}<br />AMIS</span>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            }
        </>
    );
}