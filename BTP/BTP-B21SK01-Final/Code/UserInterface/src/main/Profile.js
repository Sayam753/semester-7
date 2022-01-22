import React, { useState } from "react";
import { useStateValue } from "./StateProvider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
function Profile({ profile, eror, isLoading }) {
  const [state, dispatch] = useStateValue();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const handleLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : (
        eror?<div style={{marginTop:"25vh"}}> <center>
        <img style={{ width: "200px", height: "200px" }} alt="" src="/network.svg" />
      
      <Typography variant='h5' style={{color:"#495057"}}>
        Network Error
      </Typography>
      </center>
      </div>:
        <div>
          <Container maxWidth={false}>
            

            <div style={{ margin: "18px" }} />
            <center>
              <Card style={{ padding: "16px", borderRadius: "18px"}} variant='outlined'>
                {profile.picture ? (
                  <img
                    draggable={false}
                    style={{ borderRadius: "50%" }}
                    width="75px"
                    height="75px"
                    src={profile.picture}
                    alt=""
                  />
                ) : (
                  <img
                    width="100px"
                    height="100px"
                    draggable={false}
                    alt=""
                    src="/man.svg"
                  />
                )}

                <Typography variant="h5" style={{color: '#495057'}}>{profile.username}</Typography>

                <Typography variant="body1" style={{color: '#6c757d'}} >{profile.email}</Typography>

                <Typography style={{color: '#6c757d'}}>
                  {new Date(
                    parseInt(state._id.substring(0, 8), 16) * 1000
                  ).toDateString()}
                </Typography>

                <div
              style={{
                marginTop: "16px",
              }}
            >
              <Button
                onClick={handleLogoutDialog}
                variant="outlined"
                color="primary"
                style={{
                  borderRadius: "8px",
                 
                 
                }}
              >
                Logout &nbsp;
                <ExitToAppIcon />
              </Button>
            </div>

                
              </Card>

                    

            </center>
          
          </Container>

          <Dialog
            open={openLogoutDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You will be Logged out of this Device. All cached data will be
                deleted, the app may load slower for the first usage.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseLogoutDialog}
                style={{ color: "rgb(63,81,181)" }}
              >
                CANCEL
              </Button>
              <Button
                style={{ color: "rgb(63,81,181)" }}
                autoFocus
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
      
      }
    </div>
  );
}

export default Profile;
