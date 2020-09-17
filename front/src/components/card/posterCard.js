import React, { useState } from 'react';
import { useStore } from '../../store/store';
import { betaseriesAPI } from '../../services/betaseriesAPI';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { Grow } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';

import CardButtons from './cardButtons';

const useStyles = makeStyles(() => ({
  card: {
    // cursor: 'pointer',
    borderRadius: '5px',
    boxShadow: 'none',
    position: 'relative',
    minWidth: 200,
    minHeight: 360,
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '64%',
      bottom: 0,
      zIndex: 1,
      background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
      transition: 'height 0.2s ease-in'
    },
    '&:hover': {
      '&:after': {
        height: '200%',
        background: '000000bd',
        transition: 'height 0.7s 0.1s ease-out'
      },
      '& $backImg': {
        transform: 'scale(1.06)',
        transition: 'transform 0.5s 0.1s',
      }
    }
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '91%',
  },
  buttonBox: {
    // display: 'flex'
  },
  backImg: {
    transition: 'transform 0.4s',
  }
}));

const GalaxyCard = React.memo(function GalaxyCard({ show }) {
  const [store, dispatch] = useStore();
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
  const styles = useStyles();
  const [isHovered, setIsHovered] = useState(false);
  const [inUser, setInUser] = useState(false);
  const { title, images: { poster }, seasons, id, notes, description } = show;
  const handleAddShow = async () => {
    const response = await betaseriesAPI.addShowToUser(id, store.access_token);
    if (response.status === 200) {
      setInUser(true);
    }
  }

  const handleRemoveShow = async () => {
    const response = await betaseriesAPI.removeShowToUser(id, store.access_token);
    if (response.status === 200) {
      setInUser(false);
    }
  }

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
      <Card className={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <CardMedia
          classes={mediaStyles}
          className={styles.backImg}
          image={poster}
        />
        <Grow in={!isHovered} {...(isHovered ? { timeout: 600 } : { timeout: 500 })}>
          <Box py={3} px={2} className={styles.content}>
            <Info useStyles={useGalaxyInfoStyles}>
              <InfoTitle>{title}</InfoTitle>
              {/* <InfoSubtitle>{seasons} saisons</InfoSubtitle> */}
              <InfoCaption>{seasons} saisons</InfoCaption>
              {/* <Rating name="read-only" precision={0.5} size="small" value={notes.mean} readOnly /> */}
            </Info>
          </Box>
        </Grow>

        <Grow in={isHovered} {...(isHovered ? { timeout: 800 } : { timeout: 500 })}>
          <Box py={1} px={1} className={`${styles.content} ${styles.buttonBox}`} style={{ width: '96%', height: '96%' }}>
            <Info useStyles={useGalaxyInfoStyles}>
              <InfoTitle style={{ margin: '0.8rem 0 1rem' }}>{title}</InfoTitle>
              <InfoCaption>{description}</InfoCaption>
              {/* <Rating name="read-only" precision={0.5} size="small" value={notes.mean} readOnly /> */}
            </Info>

            <CardButtons handleAddShow={handleAddShow} handleRemoveShow={handleRemoveShow} inUser={inUser} />
            {/* <Info useStyles={useGalaxyInfoStyles}> */}
            {/* <InfoTitle>"pdlaspokdsapokdsapodk"</InfoTitle> */}
            {/* </Info> */}
          </Box>
        </Grow>
      </Card>
    </>
  );
});

export default GalaxyCard