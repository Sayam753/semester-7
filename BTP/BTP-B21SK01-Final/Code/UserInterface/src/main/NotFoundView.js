import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  IconButton,
  Avatar,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const history = useHistory()
  const classes = useStyles();

  return (
 
      <Box
        style={{marginTop:'15vh'}}
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h4"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/notfound.svg"
            />
          </Box>
          <center>
          <IconButton style={{ width: "60px", height: "60px", }} onClick={() => history.replace('/')}>
       <Avatar style={{ width: "60px", height: "60px", backgroundColor: "rgb(63,81,181" }}>
           <HomeIcon />
       </Avatar>
   </IconButton></center>
        </Container>
      </Box>
   
  );
};

export default NotFound;
