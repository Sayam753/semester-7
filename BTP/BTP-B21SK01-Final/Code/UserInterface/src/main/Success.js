import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    textAlign: "center",
    backgroundImage: "url(/success.svg)",
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
    minHeight: "100vh"
  },
  title: {
    padding: theme.spacing(5, 0)
  },
  subtitle: {
    color: theme.palette.primary.light
  },
}));

const Success =  () => {
  const classes = useStyles();
  return (
    
       <Fragment >
        
      <div className={classes.root}>
      <Typography variant='h4' className={classes.title}>
        Congratulations! 
      </Typography>
      <Typography variant='h6' className={classes.subtitle}>
      You have been registered.
      </Typography>
      <br />
      <Link to="/login" style={{textDecoration:"none"}}>
      <Button variant="contained" color="primary">
        Login
      </Button>
      </Link>
      </div>
    </Fragment>
    
   
  );
};

export default Success