import React, { useState } from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { Fade, Grow, Collapse } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';

import { Rating } from '@material-ui/lab';
import { useStore } from '../../store/store';

const useStyles = makeStyles(() => ({
  card: {
    cursor: 'pointer',
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
        height: '250%',
        transition: 'height 0.7s 0.2s ease-out'
      },
      '& $backImg': {
        transform: 'scale(1.08)'
      }
    }
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '91%',
  },
  backImg: {
    transition: 'transform 0.6s 0.2s',
  }
}));

const GalaxyCard = React.memo(function GalaxyCard({ show }) {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
  const styles = useStyles();
  const [isHovered, setIsHovered] = useState(false);

  const { title, images: { poster }, episodes, seasons, notes } = show;

  // console.log(poster);

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
        {/* {console.log(styles)} */}
        <Grow in={!isHovered} {...(isHovered ? { timeout: 800 } : {})}>
          <Box py={3} px={2} className={styles.content}>
            <Info useStyles={useGalaxyInfoStyles}>
              <InfoTitle>{title}</InfoTitle>
              {/* <InfoSubtitle>{seasons} saisons</InfoSubtitle> */}
              <InfoCaption>{seasons} saisons</InfoCaption>
              {/* <Rating name="read-only" precision={0.5} size="small" value={notes.mean} readOnly /> */}
            </Info>
          </Box>
        </Grow>
        {/* <Grow in={isHovered}>
          <Box py={3} px={2} className={styles.content}>
            <Info useStyles={useGalaxyInfoStyles}>
              <InfoTitle>"pdlaspokdsapokdsapodk"</InfoTitle>
              <InfoCaption>{seasons} saisons</InfoCaption>
            </Info>
          </Box>
        </Grow> */}
      </Card>
    </>
  );
});

export default GalaxyCard