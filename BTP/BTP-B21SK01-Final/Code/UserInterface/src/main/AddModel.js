import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useStateValue } from "./StateProvider";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import { Typography } from "@material-ui/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start",
    },
  },
  header: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    background: "#edf2f4",
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
  title: {
    color: "#fffff",
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: theme.palette.primary.light,
  },
  toolbar: {
    justifyContent: "center",
  },
  formdiv: {
    padding: 0,

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(15, 20, 0, 20),
    },
  },
  form: {
    padding: theme.spacing(3),
  },
  register: {
    padding: theme.spacing(2, 0, 0, 0),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

function AddModel({ handleClose, loadTasks }) {
  const classes = useStyles();
  const [state] = useStateValue();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const file = selectedFile;
    if (!selectedFile) {
      setSnackmessage("Image not Selected");
      setOpen(true);
      setIsLoading(false);
      return;
    }

    axios
      .get("http://192.168.29.179:8080/api/upload/image", {
        headers: {
          "auth-token": state.token,
        },
      })
      .then((res) => {
        const url = res.data.url;
        axios
          .put(url, file, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            const image_url = url.split("?")[0];
            axios
              .post(
                "http://192.168.29.179:8080/api/upload/model",
                { title, description, image_url },
                {
                  headers: {
                    "auth-token": state.token,
                  },
                }
              )
              .then((res) => {
                setTitle("");
                setDescription("");
                setFileInputState("");
                setPreviewSource("");
                setSelectedFile();
                setSubmitted(true);
                setIsLoading(false);
                loadTasks()
              })
              .catch(() => {
                setSnackmessage("Something went Wrong");
                setOpen(true);
                setIsLoading(false);
                return;
              });
          })
          .catch(() => {
            setSnackmessage("Image not Uploaded");
            setOpen(true);
            setIsLoading(false);
            return;
          });
      })
      .catch(() => {
        setSnackmessage("Something went Wrong");
        setOpen(true);
        setIsLoading(false);
        return;
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  return (
    <div>
      {submitted ? (
       <div style={{marginTop:"30vh"}} onClick={handleClose}>
       <svg
         className="checkmark"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 52 52"
       >
         <circle
           className="checkmark__circle"
           cx="26"
           cy="26"
           r="25"
           fill="none"
         />
         <path
           className="checkmark__check"
           fill="none"
           d="M14.1 27.2l7.1 7.2 16.7-16.8"
         />
       </svg>
       <center>
       <Typography style={{color:"#495057"}} variant="h5">
         We are building your model.
       </Typography>
       <Typography style={{color:"#6c757d"}} variant="body2">
         You will be notified once we are done.
       </Typography>
        {/* <Button onClick={handleClose}>
          Return
        </Button> */}

        

       </center>
     </div>
      ) : (
        <div>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />

            <TextField
              // placeholder='Type your email here'

              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              margin="normal"
              multiline={true}
              minRows={3}
              maxRows={5}
              required
              fullWidth
            />

            <input
              id="contained-button-file"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              className="form-input"
              style={{ display: "none" }}
            />

            <label htmlFor="contained-button-file">
              <Button
                style={{ marginTop: "12px" }}
                size="large"
                variant="outlined"
                fullWidth
                color="default"
                component="span"
              >
                <AddAPhotoIcon />
                &nbsp;&nbsp;Select
              </Button>
            </label>
            {previewSource && (
              <div
                style={{
                  paddingTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TransformWrapper>
                  <TransformComponent>
                    <img
                      src={previewSource}
                      alt=""
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        marginBottom: "18px",
                      }}
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            )}

            <Button
              disabled={isLoading}
              style={{ marginTop: previewSource ? "0px" : "18px" }}
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
            <div style={{marginTop:"12px"}}>
            <Typography style={{color:"#495057"}} variant="caption">
        
               * Make sure Image is taken in bright light.
               <br />
               * The object and background are contrasting.
               <br />
               * The process usually takes around 30 - 40 sec.
            </Typography>
            </div>
          </form>

       
      
       
     
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            resumeHideDuration={3000}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            open={open}
          >
            <SnackbarContent
              className={(classes.error, classes.error)}
              message={
                <span className={classes.message}>
                  <ErrorIcon className={classes.icon} />
                  {snackmessage}
                </span>
              }
            />
          </Snackbar>
        </div>
      )}
    </div>
  );
}

export default AddModel;
