import React, { useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';
import { KeyboardArrowDown } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import Rating from '@material-ui/lab/Rating';

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
    marginBottom: '1.5rem'
  },
  content: {
    padding: '8px 24px',
  },
  tag: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '1.2rem',
  },
  metaDataRight: {
    fontSize: '1.2rem',
  },
  tagWrapper: {
    marginBottom: '9px',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SimpleSlide({ showDetails, setShowDetails, show }) {
  const classes = useStyles();
  const arrowBtnStyle = useArrowDarkButtonStyles();

  const handleClose = () => setShowDetails(v => !v);
  const { title, images, seasons, length, notes, creation, genres, rating, episodes, description } = show;

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
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
      >

        <div className={classes.bannerWrapper}>
          <h1 className={`${classes.bannerTitle} ${classes.bannerItem}`}>{title}</h1>
          <span className={`${classes.bannerBottomLeft} ${classes.bannerItem} ${classes.bannerBottomText}`}>Noté {notes.mean.toFixed(1)} sur 5</span>
          <span className={`${classes.bannerItem} ${classes.bannerBottomRight} ${classes.bannerBottomText}`}>{creation}</span>
          <img className={classes.bannerImg} src={images.show}></img>
        </div>
        {/* <DialogContent> */}
        <div className={classes.content}>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
          <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
              <span className={classes.tag}>Description</span>
              <p style={{ color: '#333', fontSize: '1.3rem' }}>{description}</p>
            </Grid>
            <Grid item xs={12} md={5}>
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

          {/* </DialogContentText> */}
        </div>
        {/* </DialogContent> */}
        <DialogActions>
          <div style={{ transform: 'scale(0.7)' }}>
            <Button classes={arrowBtnStyle} onClick={handleClose}>
              <KeyboardArrowDown />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
