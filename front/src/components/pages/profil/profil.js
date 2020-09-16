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
    },
    suivis: {
        width: '50%',
        float: 'left',
    },
}));

export default function Profil() {
    const classes = useStyles();
    const access_token = authService.getToken();
    const [store, storeDispatch] = useStore();
    const [userInfo, setUserInfo] = useState(null);
    const [isFriend, setIsFriend] = useState(true);
    const [friendsBloqued, setFriendsBloqued] = useState(null);
    const [userFriends, setUserFriends] = useState(null);

    let idUser = useRouteMatch("/profil/:id").params.id;
    let URL = useLocation().pathname;

    useEffect(() => {
        betaseriesAPI.getUserInfoById(idUser).then(res => {
            setUserInfo(res.data.member);
        }).catch(err => {
            console.log(err);
        });
        setIsFriend(true);

        betaseriesAPI.friendList(idUser, access_token).then(res => {
            setUserFriends(res.data.users);
        }).catch(err => {
            console.log(err);
        });
    }, [idUser]);

    useEffect(() => {
        if (store.user) {
            betaseriesAPI.friendList(store.user.id, access_token).then(res => {
                const found = res.data.users.find(element => element.id === idUser);
                if (found !== undefined) {
                    setIsFriend(false);
                }
            }).catch(err => {
                console.log(err);
            });

            listeBlockedFriends();
        }
    }, [store]);

    function listeBlockedFriends() {
        betaseriesAPI.friendListBlocked(access_token, true).then(res => {
            setFriendsBloqued(res.data.users);
        }).catch(err => {
            console.log(err);
        });
    }

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

    const handleClickAdd = () => {
        betaseriesAPI.addFriend(userInfo.id, access_token).then(res => {
            setIsFriend(false);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleClickDelete = () => {
        betaseriesAPI.deleteFriend(userInfo.id, access_token).then(res => {
            setIsFriend(true);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleClickBlocked = () => {
        betaseriesAPI.blockFriend(userInfo.id, access_token).then(res => {
            listeBlockedFriends();
            setIsFriend(true);
        }).catch(err => {
            console.log(err);
        });
    }
    
    const handleClickDeblocked = () => {
        betaseriesAPI.deblockFriend(userInfo.id, access_token).then(res => {
            listeBlockedFriends();
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            { userInfo != null &&
                <Container maxWidth={'lg'}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                Resumé de <span className={classes.upperCase}>{userInfo.login}</span>
                                {store.user && store.user.id !== userInfo.id &&
                                    (isFriend ?
                                        friendsBloqued && userInfo.id && friendsBloqued.find(element => element.id === userInfo.id) ?
                                            <Button variant="contained" color="primary" onClick={handleClickDeblocked} >
                                                Débloquer
                                            </Button>
                                            :
                                            <Button variant="contained" color="primary" onClick={handleClickAdd}>
                                                Suivre
                                            </Button>
                                        :
                                        <>
                                            <Button variant="contained" onClick={handleClickBlocked}>
                                                Bloquer
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={handleClickDelete}>
                                                Supprimer
                                            </Button>
                                        </>)
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
                                <span>{userFriends && userFriends.length}<br />
                                    <Link to={`${URL}/friends`}>SUIVIS</Link>
                                </span>
                            </Paper>
                        </Grid>
                        {store.user && store.user.id === userInfo.id &&
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <span>
                                        Personnes Bloquer:
                                    <br />
                                        {friendsBloqued && friendsBloqued.length > 0 ?
                                            friendsBloqued.map((e) => {
                                                return (
                                                    <Paper key={e.id} className={`${classes.paper} ${classes.mt18}`}>
                                                        <Link to={`/profil/${e.id}`} ><p>{e.login}</p></Link>
                                                    </Paper>
                                                )
                                            })
                                            :
                                            <Paper className={`${classes.paper} ${classes.mt18}`}>
                                                <p>Aucun amis bloqué pour le moment !</p>    
                                            </Paper>
                                        }
                                    </span>
                                </Paper>
                            </Grid>
                        }
                    </Grid>
                </Container>
            }
        </>
    );
}