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

import { betaseriesAPI } from '../../services/betaseriesAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  wrapper: {
    width: 100 + theme.spacing(2),
  },
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SimpleSlide({ showDetails, setShowDetails, show }) {
  const classes = useStyles();
  const arrowBtnStyle = useArrowDarkButtonStyles();

  const handleClose = () => setShowDetails(v => !v);
  const { title, images: { poster }, seasons, id, notes, creation, genres, rating, showrunner } = show;

  return (
    <>
      <Dialog
        open={showDetails}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          {/* <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle> */}
        <DialogContent>
        {/* <Box>
        <img style={{ objectFit: 'contain' }} src="https://pictures.betaseries.com/fonds/banner/19961_1332404.jpg"></img>
        </Box> */}
          <div style={{ height: 'auto', overflow: 'auto' }}>
            <div style={{ float: 'right', height: 'auto' }}><img style={{ objectFit: 'contain' }} src="https://pictures.betaseries.com/fonds/banner/19961_1332404.jpg"></img></div>
          </div>
          <DialogContentText id="alert-dialog-slide-description">
            infos ici.ddddddddddddddddddddddddddddddddddopk  p spo dpo ksapo apo sopsk p pok dpok daspok po kapok pok
          </DialogContentText>
        </DialogContent>
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
