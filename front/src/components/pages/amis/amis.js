import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Avatar } from '@material-ui/core';
import { useRouteMatch, Link } from "react-router-dom";
import { betaseriesAPI } from '../../../services/betaseriesAPI';
import { makeStyles } from '@material-ui/core/styles';
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
    textLeft:{
        textAlign: 'left',
    },
}));

export default function Amis() {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState(null);
    const [userFriends, setUserFriends] = useState(null);
    let idUser = useRouteMatch("/profil/:id/friends").params.id;
    const access_token = authService.getToken();


    useEffect(() => {
        betaseriesAPI.getUserInfoById(idUser).then(res => {
            console.log(res);
            setUserInfo(res.data.member);
        }).catch(err => {
            console.log(err);
        });

        betaseriesAPI.friendList(idUser, access_token).then(res => {
            console.log(res.data.users);
            setUserFriends(res.data.users);
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
                                Amis de <span className={classes.upperCase}>{userInfo.login}</span>
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <p>Nombre d'amis : <span className={classes.upperCase}>{userInfo.stats.friends}</span></p>
                            </Paper>
                        </Grid>
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>
                                <p className={classes.textLeft}>List d'amis</p>

                                {userFriends && userFriends.map(e => {
                                    
                                    return <Link to={`/profil/${e.id}`}><p>{e.login}</p></Link>
                                    // console.log(e);
                                })}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            }
        </>
    )
}
