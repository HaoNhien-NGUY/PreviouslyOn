import React, { useEffect, useState, useCallback } from 'react';
import { betaseriesAPI } from '../../../services/betaseriesAPI';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

export default function AlertDialog({ setEpisode, episode, store }) {
    const [comments, setComments] = useState(null);
    const [commentInput, setCommentInput] = useState("");

    const handleClose = () => {
        setEpisode(false);
    };

    const getEpisodeDetails = async () => {
        const response = await betaseriesAPI.getEpisodeComments(episode.id, store.access_token);
        if (response.status === 200) {
            setComments(response.data.comments);
        }
        console.log(response);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await betaseriesAPI.commentEpisode(episode.id, commentInput, store.access_token);
        console.log(response);
        if(response.status === 200) {
            getEpisodeDetails();
        }
    }

    useEffect(() => {
        getEpisodeDetails();
    }, [])

    const localDate = useCallback((date) => {
        const myDate = new Date(date);
        return myDate.toLocaleDateString(store.user?.locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }, [comments, store]);

    // console.log(episode);

    return (
        <>
            <DialogTitle id="alert-dialog-title">Commentaires</DialogTitle>
            <DialogContent>
                {
                    comments
                        ?
                        comments.map(comment =>
                            (
                                <>
                                    <div style={{ display: 'flex' }}>
                                        <h3 style={{ margin: '0 0 20px 0' }}>{comment.login}</h3><span> - Posté le {localDate(comment.date)}</span>
                                    </div>
                                    <p>{comment.text}</p>
                                    <Divider style={{ margin: '20px' }} />
                                </>
                            )
                        )
                        :
                        <h1>Pas de commentaires</h1>
                }
                <form style={{ padding: '0px 20px', marginTop: '4rem' }}>
                    <TextField
                        margin="dense"
                        id="comment"
                        label="Commenter"
                        type="text"
                        fullWidth
                        multiline={true}
                        onChange={(e) => { setCommentInput(e.target.value); }}
                    />
                    <div>

                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            style={{ margin: '35px auto 10px auto', display: 'block' }}
                        >
                            Envoyer
                        </Button>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Fermer
                </Button>
            </DialogActions>
        </>
    );
}