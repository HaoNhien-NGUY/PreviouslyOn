import React from 'react';
import { Slide, Button, Dialog, DialogActions, DialogContent, makeStyles, Grid } from '@material-ui/core';
import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';
import { KeyboardArrowDown } from '@material-ui/icons';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';

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
    padding: '12px 12px',
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

export default React.memo(function SimpleSlide({ showDetails, setShowDetails, show }) {
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
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <span className={classes.tag}>Description</span>
              <p style={{ color: '#333', fontSize: '1.3rem' }}>{description}</p>
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
        <DialogActions style={{ backgroundColor: '#00000008'}}>
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
