import React from 'react';
import Button from '@material-ui/core/Button';
import { useStateValue } from './StateProvider';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from "@material-ui/core/Typography";
import FacebookIcon from '@material-ui/icons/Facebook';
// import Header from './Header'
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start"
    }
  },
  header: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    background: "#edf2f4",
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1
    }
  },
  title: {
    color: "#fffff",
    marginBottom: theme.spacing(1)
  },
  subtitle: {
    color: theme.palette.primary.light
  },
  toolbar: {
    justifyContent: "center"
  },
  formdiv: {
    padding: 0,

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(15, 20, 0, 20)
    }
  },
  form: {
    padding: theme.spacing(3)
  },
  register: {
    padding: theme.spacing(2, 0, 0, 0)
  }
}));

function Login() {

  const [ , dispatch] = useStateValue();
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1)
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError('');
    const formJson = { 'email': email, 'password': password }
    axios.post('http://192.168.29.179:8080/api/auth/login',
      formJson
    ).then(function (response) {
      const storedJwt = localStorage.getItem('user_token');
      if (!storedJwt && remember) {
        localStorage.setItem('user_token', response.data.token.toString());
      }
      var decoded = jwt_decode(response.data.token);
      decoded["isLoggedin"] = true;
      decoded["token"] = response.data.token;
      dispatch({
        type: "LOGIN",
        item: decoded
      })

      setIsSubmitting(false)




    }).catch(function (error) {

      setIsSubmitting(false);
      if (error.message === "Network Error")
        setLoginError("Network Error");
      else
        setLoginError(error.response.data.error);
    })
  }

  return (
    <div>
      {/* <Header /> */}
      <Grid container className={classes.root}>

        <Grid item className={classes.header} xs={12} md={4} style={{ borderRadius: "0px 0px 30px 30px" }}>
          <center>
            <img style={{ width: "150px", height: "150px" }} alt="" src="/auth.svg" />
          </center>
          <Typography variant='h4' className={classes.title}>
            Sign In
          </Typography>

        </Grid>
        <Grid item xs={12} md={8}>
          <div className={classes.formdiv}>

            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>

              <TextField
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"

              />

              <FormControl variant="outlined" fullWidth margin='normal'>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  name='password'
                  label='Password'
                  type={showPassword1 ? 'text' : 'password'}
                  variant='outlined'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword1}
                        edge="end"
                      >
                        {showPassword1 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required


                />


              </FormControl>

              <FormControlLabel
                control={<Checkbox checked={remember} color="primary" onChange={(e) => setRemember(e.target.checked)} />}
                label="Remember me"
              />
              <div style={{ marginBottom: "8px" }} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
                size="large"
              >

                Sign In
          </Button>

          <div style={{ marginBottom: "8px" }} />

          <Grid container spacing={2} >
           <Grid item xs={6} sm={6}>
           <Button
              fullWidth
              size="large"
              variant="contained"
              style={{ marginTop: "16px", textTransform: 'none', color:"gray", background:"rgb(255,255,255)" }}

              className={classes.submit}
              >

              <img style={{ height: "20px", width: "20px" }}
                alt="Logo"
                src="/google.svg"

              />
              &nbsp;&nbsp;
              Google
              </Button>
              </Grid>
              <Grid item xs={6} sm={6}>

              <Button

                fullWidth
                variant="contained"
                size="large"

                style={{ marginTop: "16px", textTransform: 'none', color:"white", background:"rgb(67,96,156)" }}

                >

                <FacebookIcon fontSize="medium" />
                &nbsp;
                Facebook
                </Button>

            </Grid>
            </Grid>

            
            <div className={classes.register}>
                <Link to="/register" style={{color:"rgb(63,81,181)",textDecoration:"none"}}>
                  <Typography variant="body1">Don't have an account? Sign Up</Typography>
                </Link>
              </div>

              {loginError && (
                <Alert style={{ marginTop: "16px" }} severity="error">{loginError}</Alert>
              )}
            </form>

          </div>

        </Grid>
      </Grid>

    </div>
  );
}

export default Login