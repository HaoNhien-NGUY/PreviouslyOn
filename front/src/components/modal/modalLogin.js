import React, { useState } from 'react';
import { ACTIONS } from '../../store/store';
import { betaseriesAPI } from '../../services/betaseriesAPI';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, makeStyles } from '@material-ui/core';
import './modalLogin.css';
const md5 = require('md5');

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    fabProgress: {
        color: theme.primary,
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: theme.primary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function ModalLogin({ isOpen, storeDispatch, handleClose }) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        let invalids = {};

        if (name && password) {
            const user = {
                login: name,
                password: md5(password)
            }

            const res = await betaseriesAPI.login(user);

            if (res.status === 200) {
                const userResp = await betaseriesAPI.getUserInfo(res.data.token);
                const { login, avatar, locale } = userResp.data.member;
                storeDispatch({ type: ACTIONS.LOGIN, payload: { login, access_token: res.data.token, avatar, locale } });
                handleClose();
                setIsInvalid(invalids);
                setIsLoading(false);
            } else {
                invalids.error = "Login ou mot de passe incorrect !";
                setIsInvalid(invalids);
                setIsLoading(false);
            }
        } else {
            setIsInvalid({ error: 'Login ou mot de passe manquant.' });
            setIsLoading(false);
        }
    }

    const resetErrorMsg = () => {
        if (isInvalid) {
            setIsInvalid(false)
        }
    }

    return (
        <>
            <Dialog open={isOpen} onClose={() => { handleClose(); setIsInvalid({}); }} maxWidth={'xs'} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', color: '#3f51b5' }}>Login</DialogTitle>

                <div className="error">{isInvalid.error}</div>

                <DialogContent>
                    <form style={{ padding: '0px 20px' }}>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Username"
                            type="text"
                            fullWidth
                            onChange={(e) => { setName(e.target.value); resetErrorMsg(); }}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={(e) => { setPassword(e.target.value); resetErrorMsg(); }}
                        />
                        <div className={classes.wrapper}>

                            {isLoading
                                ?
                                (<>
                                    <CircularProgress size={24} className={classes.buttonProgress} />
                                    <Button variant="contained" disabled style={{ margin: '35px auto 20px auto', display: 'block' }}>Submit</Button>
                                </>)
                                :
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: '35px auto 20px auto', display: 'block' }}
                                >
                                    Submit
                                </Button>

                            }
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}