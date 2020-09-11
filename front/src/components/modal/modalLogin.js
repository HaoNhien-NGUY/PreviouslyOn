import React, { useState } from 'react';
import { useStore, ACTIONS } from '../../store/store';
import { betaseriesAPI } from '../../services/betaseriesAPI';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
const md5 = require('md5');

export default function ModalLogin({ isOpen, handleClickOpen, handleClose }) {
    const [store, storeDispatch] = useStore();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {

        if (name && password) {
            const user = {
                login: name,
                password: md5(password)
            }

            betaseriesAPI.login(user)
                .then((res) => {
                    console.log(res);
                    handleClose();
                    storeDispatch({ type: ACTIONS.LOGIN, payload: { login: res.data.user.login, access_token: res.data.token } });   
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="text"
                        fullWidth
                        onChange={(e) => { setName(e.target.value) }}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}