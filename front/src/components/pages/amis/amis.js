import React, { useEffect, useState, Fragment } from 'react';
import { Container, Grid, Paper, Avatar } from '@material-ui/core';
import { useRouteMatch, Link, Redirect, useHistory } from "react-router-dom";
import { betaseriesAPI } from '../../../services/betaseriesAPI';
import { makeStyles } from '@material-ui/core/styles';
import { authService } from '../../../services/authService';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    textLeft: {
        textAlign: 'left',
    },
    floatRight: {
        float: 'right',
    },
}));

export default function Amis() {
    const history = useHistory();
    const classes = useStyles();
    const access_token = authService.getToken();
    const [userInfo, setUserInfo] = useState(null);
    const [userFriends, setUserFriends] = useState(null);
    let idUser = useRouteMatch("/profil/:id/friends").params.id;
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [allMembers, setAllMembers] = useState([]);
    const loading = open && allMembers.length === 0;
    const [value, setValue] = useState(allMembers[0]);

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    useEffect(() => {
        betaseriesAPI.getUserInfoById(idUser).then(res => {
            setUserInfo(res.data.member);
        }).catch(err => {
            console.log(err);
        });

        betaseriesAPI.friendList(idUser, access_token).then(res => {
            setUserFriends(res.data.users);
        }).catch(err => {
            console.log(err);
        });
    }, [idUser]);

    useEffect(() => {
        if (input.length >= 2) {
            betaseriesAPI.findMembers(input).then(res => {
                setAllMembers(
                    res.data.users
                );
            }).catch(err => {
                console.log(err);
            });
        }
    }, [loading, input]);
    
    useEffect(() => {
        if (value) {
            // return <Redirect to={`/profil/${value.id}`} />;
            history.push(`/profil/${value.id}`);
        }
    }, [value]);

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
                        <Grid item xs={3}>
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                style={{ width: '100%' }}
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                // getOptionSelected={(allMembers, value) => allMembers.login === value.login}
                                getOptionLabel={(allMembers) => allMembers.login}
                                options={allMembers}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Recherche"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </Fragment>
                                            ),
                                        }}
                                        onChange={handleChange}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Paper className={classes.paper}>
                                <p className={classes.textLeft}>List d'amis
                                    <span className={classes.floatRight}>Nombre d'amis : <span className={classes.upperCase}>{userInfo.stats.friends}</span></span>
                                </p>
                                {userFriends && userFriends.map(e => {
                                    return <Link to={`/profil/${e.id}`} key={e.id}><p>{e.login}</p></Link>
                                })}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            }
        </>
    )
}
