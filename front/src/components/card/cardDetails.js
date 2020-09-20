import React, { useState, useEffect } from 'react';
import { betaseriesAPI } from '../../services/betaseriesAPI'
import { Slide, Button, Dialog, DialogActions, DialogContent, makeStyles, Grid, Box, CircularProgress } from '@material-ui/core';
import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';
import { KeyboardArrowDown } from '@material-ui/icons';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bannerTitle: {
    top: '50%',
    width: '100%',
    textAlign: 'center',
    transform: 'translateY(-50%)',
    color: 'white',
    fontFamily: 'Montserrat',
  },
  bannerBottomLeft: {
    bottom: '20px',
    left: '20px',
    color: 'white',
  },
  bannerItem: {
    zIndex: 10,
    position: 'absolute',
    margin: 0,
  },
  bannerBottomText: {
    color: 'white',
    fontSize: '1.2rem',
    fontFamily: 'Spartan',
  },
  bannerImg: {
    objectFit: 'contain',
    maxWidth: '100%',
    filter: 'brightness(45%)'
  },
  bannerBottomRight: {
    bottom: '20px',
    right: '20px'
  },
  bannerWrapper: {
    position: 'relative',
  },
  content: {
    padding: '15px 0',
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
  dialogActions: {
    backgroundColor: 'rgba(63, 81, 181, 0.04)',
    justifyContent: 'space-between',
  },
  parent: {
    display: 'flex',
  },
  fabProgress: {
    color: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  btnWrapper: {
    position: 'relative',
    marginRight: '1.5rem',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default React.memo(function SimpleSlide({ showDetails, setShowDetails, show, store, handleAddShow, handleRemoveShow, inUser }) {
  const { id, title, images, seasons, length, notes, creation, genres, rating, episodes, description } = show;
  const history = useHistory();
  const classes = useStyles();
  const arrowBtnStyle = useArrowDarkButtonStyles();
  const gutterStyles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [archiveInUser, setArchiveInUser] = useState(false);
  const handleClose = () => setShowDetails(v => !v);

  useEffect(() => {
    setIsLoading(false);
  }, [inUser]);

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
    const response = await betaseriesAPI.archiveShow(id, store.access_token);
    console.log(response);
    if (response.status === 200) {
      setArchiveInUser(true);
    }
  };

  const handleUnarchiveShow = async () => {
    const response = await betaseriesAPI.unarchiveShow(id, store.access_token);
    console.log(response);
    if (response.status === 200) {
      setArchiveInUser(false);
    }
  };


  return (
    <>
      <NoSsr>
        <GoogleFontLoader
          fonts={[
            { font: 'Spartan', weights: [300] },
            { font: 'Montserrat', weights: [200, 400, 700] },
          ]}
        />
      </NoSsr>
      <Dialog
        open={showDetails}
        TransitionComponent={Transition}
        onClose={handleClose}
        // keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
      >

        <div className={classes.bannerWrapper}>
          <h1 className={`${classes.bannerTitle} ${classes.bannerItem}`}>{title}</h1>
          <span className={`${classes.bannerBottomLeft} ${classes.bannerItem} ${classes.bannerBottomText}`}>Noté {notes.mean.toFixed(1)} sur 5</span>
          <span className={`${classes.bannerItem} ${classes.bannerBottomRight} ${classes.bannerBottomText}`}>{creation}</span>
          <img className={classes.bannerImg} src={images.show} alt="show-banner"></img>
        </div>
        <DialogContent>
          <div className={classes.content}>
            <Grid container spacing={5} justify="space-between">
              <Grid item xs={12} md={7}>
                <span className={classes.tag}>Description</span>
                <p style={{ color: '#333', fontSize: '1.2rem' }}>{description}</p>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.metaDataRight}>
                  <div className={classes.tagWrapper}>
                    <span className={classes.tag}>Genres: </span><span> {Object.values(genres).join(', ')}</span>
                  </div>
                  <div className={classes.tagWrapper}>
                    <span className={classes.tag}>Rating: </span><span> {rating}</span>
                  </div>
                  <div className={classes.tagWrapper}>
                    <span className={classes.tag}>Nombre de saisons: </span><span> {seasons}</span>
                  </div>
                  <div className={classes.tagWrapper}>
                    <span className={classes.tag}>Nombre total d'épisodes: </span><span>{episodes}</span>
                  </div>
                  <div className={classes.tagWrapper}>
                    <span className={classes.tag}>Durée d'un épisode: </span><span> {length} min</span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <div style={{ transform: 'scale(0.8)', transformOrigin: '0 50%', marginLeft: '10px' }}>
            <Box className={gutterStyles.parent}>
              <div className={gutterStyles.btnWrapper}>
                {
                  store.user &&
                  (<Button classes={arrowBtnStyle} onClick={handleClick}>
                    {inUser ? <CheckIcon /> : <AddIcon />}
                  </Button>)
                }
                {isLoading && !inUser && <CircularProgress size="100%" className={gutterStyles.fabProgress} />}
              </div>
              {inUser &&
                (
                  !archiveInUser
                    ?
                    <div className={gutterStyles.btnWrapper}>
                      <Button classes={arrowBtnStyle} onClick={handleArchiveClick}>
                        <ArchiveIcon />
                      </Button>
                    </div>
                    :
                    <div className={gutterStyles.btnWrapper}>
                      <Button classes={arrowBtnStyle} onClick={handleUnarchiveShow}>
                        <UnarchiveIcon />
                      </Button>
                    </div>
                )

              }
              <div className={gutterStyles.btnWrapper}>
                <Button classes={arrowBtnStyle} onClick={() =>  history.push(`/shows/${id}`) }>
                  <ArrowForwardIcon />
                </Button>
              </div>
            </Box>
          </div>
          <div style={{ transform: 'scale(0.7)' }}>
            <Button classes={arrowBtnStyle} onClick={handleClose}>
              <KeyboardArrowDown />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
})
