import React, { useMemo, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { betaseriesAPI } from '../../../services/betaseriesAPI'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    root: {
        marginBottom: '1rem',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard({ episode, store, inUser, getAllEpisodes }) {
    const { title, date, description, note, user, id } = episode;
    const classes = useStyles();

    const localDate = useMemo(() => {
        const myDate = new Date(date);
        return myDate.toLocaleDateString(store.user?.locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }, [date, store]);

    const handleCheckBox = async (event) => {
        event.stopPropagation();
        const response = !user.seen
            ?
            await betaseriesAPI.addEpisodeWatched(id, store.access_token)
            :
            await betaseriesAPI.removeEpisodeWatched(id, store.access_token)
            ;
        if (response.status === 200) {
            getAllEpisodes();
        }
    }

    const addOneEpisode = async () => {
        const response = await betaseriesAPI.addEpisodeWatched(id, store.access_token, false);
        if (response.status === 200) {
            getAllEpisodes();
        }
    }

    return (
        <>
            <div className={classes.root}>
                <Accordion variant="outlined">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >
                        {
                            store.user && inUser &&
                            <FormControlLabel
                                aria-label="Seen"
                                onClick={handleCheckBox}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox checked={user.seen} />}
                            />
                        }
                        <div>
                            <Typography variant="h6" component="h5">{title}</Typography>
                            <Typography color="textSecondary">{localDate}</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <Typography color="textSecondary">{description}</Typography>
                            <Button style={{ marginTop: '1rem' }} variant="contained" disableElevation onClick={addOneEpisode}>Marquer uniquement cet épisode</Button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
};
