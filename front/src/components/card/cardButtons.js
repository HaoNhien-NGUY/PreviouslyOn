import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { KeyboardArrowUp } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

import { useArrowWhiteButtonStyles } from '@mui-treasury/styles/button/arrowWhite';

const useStyles = makeStyles( () => ({
  parent: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

const CardButton = ({ handleAddShow, handleRemoveShow, inUser }) => {
  const classes = useArrowWhiteButtonStyles();
  const gutterStyles = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [inUser]);

  const handleClick = () => {
    if(!inUser) {
      setIsLoading(true);
      handleAddShow();
    } else {
      setIsLoading(true);
      handleRemoveShow();
    }
  }

  return (
    <Box className={gutterStyles.parent}>
      <Button classes={classes} onClick={handleClick}>
        {
          isLoading
          ?
          <AddIcon />
          :
          (inUser
            ?
            <CheckIcon />
            :
            <AddIcon />
          )
          
        }
      </Button>
      <Button classes={classes}>
        <KeyboardArrowUp />
      </Button>
    </Box>
  );
};

export default CardButton;