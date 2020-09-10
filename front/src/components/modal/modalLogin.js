import React, { useState } from 'react';
import { useStore, ACTIONS } from '../../store/store';
import { betaseriesAPI } from '../../services/betaseriesAPI';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

export default function ButtonAppBar() {
    const { store, storeDispatch } = useStore();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let md5 = require('md5');

        if (name && password) {
            const user = {
                username: name,
                password: md5(password)
            }

            betaseriesAPI.login(user)
                .then((res) => {
                    console.log(res);
                    handleClose();
                    storeDispatch({ type: ACTIONS.LOGIN, payload: { username: name, access_token: "123" } });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            <Button color="inherit" onClick={handleClickOpen}>
                Login
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={(e) => { setEmail(e.target.value) }}
                    /> */}
                    <TextField
                        autoFocus
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