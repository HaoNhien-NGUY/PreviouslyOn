import React, { useState, useEffect } from 'react';
import { Box, makeStyles, Button, CircularProgress} from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { useArrowWhiteButtonStyles } from '@mui-treasury/styles/button/arrowWhite';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
  parent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'auto',
    width: '95%',
    position: 'absolute',
    bottom: 6
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
    transform: 'scale(0.7)'
  }
}));

const CardButton = ({ handleAddShow, handleRemoveShow, setShowDetails, inUser, store }) => {
  const classes = useArrowWhiteButtonStyles();
  const gutterStyles = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [inUser]);

  const handleClick = () => {
    if(isLoading) {
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

  const handleDetailsOpen = () => {
    setShowDetails(v => !v);
  }

  return (
    <Box className={gutterStyles.parent}>
      <div className={gutterStyles.btnWrapper}>
        {
          store.user &&
          (<Button classes={classes} onClick={handleClick}>
            {inUser ? <CheckIcon /> : <AddIcon />}
          </Button>)
        }
        { isLoading && !inUser && <CircularProgress size="100%" className={gutterStyles.fabProgress} />}
      </div>
      <div className={gutterStyles.btnWrapper}>
        <Button classes={classes} onClick={handleDetailsOpen}>
          <KeyboardArrowUp />
        </Button>
      </div>
    </Box>
  );
};

export default CardButton;