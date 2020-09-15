import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link, useLocation } from "react-router-dom";
import { Container, Grid, Paper, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { betaseriesAPI } from '../../../services/betaseriesAPI';
import { useStore } from '../../../store/store';
import { authService } from '../../../services/authService';

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
        textTransform: 'upperCase',
    },
    large: {
        width: '100%',
        height: '100%',
    },
    timeP: {
        fontSize: '12px',
    },
    mt38: {
        marginTop: '38px',
    },
    mt18: {
        marginTop: '18px',
    }
}));

export default function Profil() {
    const [userInfo, setUserInfo] = useState(null);
    const [isNotFriend, setIsNotFriend] = useState(true);
    const classes = useStyles();
    const [store, storeDispatch] = useStore();
    const access_token = authService.getToken();

    let idUser = useRouteMatch("/profil/:id").params.id;
    let URL = useLocation().pathname;

    useEffect(() => {
        betaseriesAPI.getUserInfoById(idUser).then(res => {
            setUserInfo(res.data.member);
        }).catch(err => {
            console.log(err);
        });
    }, [idUser]);

    useEffect(() => {
        if (store.user) {
            betaseriesAPI.friendList(store.user.id, access_token).then(res => {
                (res.data.users).map(e => {
                    console.log(e);
                    if (e.id == idUser) {
                        setIsNotFriend(false);
                    }
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }, [store])

    function TimeToWatching(time) {
        var hours = Math.floor(time / 60);
        var minutes = time % 60;

        if (hours > 24) {
            var day = 0;
            while (hours > 24) {
                hours = hours - 24;
                day = day + 1;
            }
            return `${day} jours ${hours} heures et ${minutes} minutes`;
        } else {
            return `${hours} heures et ${minutes} minutes`;
        }
    }

    return (
        <>
            { userInfo !== null &&
                <Container maxWidth={'lg'}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                Resumé de <span className={classes.upperCase}>{userInfo.login}</span>
                                {store.user.id != userInfo.id && isNotFriend &&
                                    <Button variant="contained" color="primary">
                                        Ajouter
                                    </Button>
                                }
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <Avatar variant="rounded" alt="profile-pic" src={userInfo.avatar} className={classes.large} />
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <span>{userInfo.stats.episodes}<br />ÉPISODE</span>
                            </Paper>
                            <Paper className={`${classes.paper} ${classes.mt38}`}>
                                <span>{userInfo.stats.shows}<br />SÉRIES</span>
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <span>{userInfo.xp}<br />XP</span>
                            </Paper>
                            <Paper className={`${classes.paper} ${classes.mt38}`}>
                                <span>{userInfo.stats.badges}<br />BADGES</span>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <span>Temps passé devant la télé:</span><br />
                                <span>{TimeToWatching(userInfo.stats.time_on_tv)}</span><br />
                                <span className={classes.timeP}>Encore {TimeToWatching(userInfo.stats.time_to_spend)}</span>
                            </Paper>
                            <Paper className={`${classes.paper} ${classes.mt18}`}>
                                <span>{userInfo.stats.friends}<br />
                                    <Link to={`${URL}/friends`}>AMIS</Link>
                                </span>
                            </Paper>
                        </Grid>
                        {/* <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <span>{userInfo.stats.friends}<br />AMIS</span>
                            </Paper>
                        </Grid> */}
                    </Grid>
                </Container>
            }
        </>
    );
}