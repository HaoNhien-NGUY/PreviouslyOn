import React, { useState, useEffect, useCallback } from 'react'
import { betaseriesAPI } from '../../../services/betaseriesAPI';
import { useStore } from '../../../store/store';
import { useRouteMatch, Link } from "react-router-dom";
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, CircularProgress } from '@material-ui/core';
import { useArrowWhiteButtonStyles } from '@mui-treasury/styles/button/arrowWhite';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ArchiveIcon from '@material-ui/icons/Archive';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

import ListEpisode from './listEpisode'

const useStyles = makeStyles({
  media: {
    height: 360,
    position: 'relative',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '64%',
      bottom: 0,
      zIndex: 1,
      background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
    }
  },
  tag: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  metaDataRight: {
    fontSize: '1.1rem',
  },
  tagWrapper: {
    marginBottom: '9px',
  },
  bannerWrapper: {
    position: 'relative',
  },
  parent: {
    display: 'flex',
    position: 'absolute',
    zIndex: 30,
    bottom: '10px',
    right: '10px',
    transform: 'scale(0.8)',
  },
  fabProgress: {
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  btnWrapper: {
    position: 'relative',
    marginLeft: '1.3rem',
  },
  title: {
    position: 'absolute',
    bottom: '10px',
    left: '20px',
    color: 'white',
    zIndex: 30,
  }
});

export default function ShowDetails() {
  const idShow = useRouteMatch("/shows/:id").params.id;
  const classes = useStyles();
  const arrowBtnStyle = useArrowWhiteButtonStyles();
  const [store, dispatch] = useStore();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [archiveInUser, setArchiveInUser] = useState(false);
  const [inUser, setInUser] = useState(false);

  const handleClick = () => {
    if (isLoading) {
      return;
    }

    if (!inUser) {
      setIsLoading(true);
      handleAddShow();
    } else {
      setIsLoading(true);
      handleRemoveShow();
    }
  }

  const handleArchiveClick = () => {
    if (!archiveInUser) {
      handleArchiveShow();
    } else {
      handleUnarchiveShow();
    }
  }

  const handleArchiveShow = async () => {
    const response = await betaseriesAPI.archiveShow(show.id, store.access_token);
    console.log(response);
    if (response.status === 200) {
      setArchiveInUser(true);
    }
  };

  const handleUnarchiveShow = async () => {
    const response = await betaseriesAPI.unarchiveShow(show.id, store.access_token);
    console.log(response);
    if (response.status === 200) {
      setArchiveInUser(false);
    }
  };

  const handleAddShow = async () => {
    const response = await betaseriesAPI.addShowToUser(show.id, store.access_token);
    if (response.status === 200) {
      setInUser(true);
    }
  };

  const handleRemoveShow = async () => {
    const response = await betaseriesAPI.removeShowToUser(show.id, store.access_token);
    if (response.status === 200) {
      setInUser(false);
    }
  };

  const getAllEpisodes = async () => {
    const response = await betaseriesAPI.getShowEpisodes(idShow, store.access_token);
    console.log('episodes');
    console.log(store.access_token);
    console.log(response);
    if (response.status === 200) {
      setEpisodes(response.data.episodes);
    }
  };

  useEffect(() => {
    if (!store.user_loading) {
      (async () => {
        const response = await betaseriesAPI.getShowDetails(idShow, store.access_token);
        if (response.status === 200) {
          setShow(response.data.show);
          setInUser(response.data.show.in_account);
          setArchiveInUser(response.data.show.user.archived);
        }
      })();

      getAllEpisodes();
    }
  }, [store.user_loading, store.user])

  useEffect(() => {
    setIsLoading(false);
  }, [inUser]);

  return (
    <>
      { show && episodes &&
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardMedia
                  className={classes.media}
                  image={show.images.show}
                >
                  <Box className={classes.parent}>
                    <div className={classes.btnWrapper}>
                      {
                        store.user &&
                        (<Button classes={arrowBtnStyle} onClick={handleClick}>
                          {inUser ? <CheckIcon /> : <AddIcon />}
                        </Button>)
                      }
                      {isLoading && !inUser && <CircularProgress size="100%" className={classes.fabProgress} />}
                    </div>
                    {inUser &&
                      (
                        !archiveInUser
                          ?
                          <div className={classes.btnWrapper}>
                            <Button classes={arrowBtnStyle} onClick={handleArchiveClick}>
                              <ArchiveIcon />
                            </Button>
                          </div>
                          :
                          <div className={classes.btnWrapper}>
                            <Button classes={arrowBtnStyle} onClick={handleUnarchiveShow}>
                              <RestoreFromTrashIcon />
                            </Button>
                          </div>
                      )
                    }
                  </Box>
                  <Typography className={classes.title} gutterBottom variant="h4" component="h4">
                    {show.title}
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Grid container spacing={5} justify="space-between">
                    <Grid item xs={12} md={7}>
                      <p style={{ color: '#333', fontSize: '1.2rem', marginTop: '0px' }}>{show.description}</p>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className={classes.metaDataRight}>
                        <div className={classes.tagWrapper}>
                          <span className={classes.tag}>Note: </span><span> {show.notes.mean.toFixed(1)} / 5</span>
                        </div>
                        <div className={classes.tagWrapper}>
                          <span className={classes.tag}>Rating: </span><span> {show.rating}</span>
                        </div>
                        <div className={classes.tagWrapper}>
                          <span className={classes.tag}>Nombre de saisons: </span><span> {show.seasons}</span>
                        </div>
                        <div className={classes.tagWrapper}>
                          <span className={classes.tag}>Nombre total d'épisodes: </span><span>{show.episodes}</span>
                        </div>
                        <div className={classes.tagWrapper}>
                          <span className={classes.tag}>Durée d'un épisode: </span><span> {show.length} min</span>
                        </div>
                        <div className={classes.tagWrapper}>
                          <span className={classes.tag}>Genres: </span><span> {Object.values(show.genres).join(', ')}</span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>



            <Grid item xs={12}>
              <Card>
                <CardContent>

                  <h1 style={{ textAlign: 'center' }}>Episodes</h1>
                  {episodes.map(episode => {
                    return episode.episode === 1
                      ?
                      (<div key={episode.id}>
                        <h1>Saison {episode.season}</h1>
                        <ListEpisode episode={episode} store={store} inUser={inUser} getAllEpisodes={getAllEpisodes}  />
                      </div>)
                      :
                      (<div key={episode.id}>
                        <ListEpisode episode={episode} store={store} inUser={inUser} getAllEpisodes={getAllEpisodes}/>
                      </div>)
                  })
                  }
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </Container>
      }
    </>
  )
}