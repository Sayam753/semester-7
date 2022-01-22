import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MoreIcon from "@material-ui/icons/MoreVert";
import InfoIcon from "@material-ui/icons/InfoOutlined"
import Fab from "@material-ui/core/Fab";
import PrintIcon from '@material-ui/icons/Print';
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import AddModel from "./AddModel";
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import QRCode from 'qrcode'
import QrReader from 'react-qr-reader'
import Alert from '@material-ui/lab/Alert';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    flex: 1,
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function HomeView({ models, eror, isLoading, loadTasks, open, setOpen }) {
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState({})
  const [qrcanvas, setQrcanvas] = React.useState('')
  const [deviceError, setDeviceError] = React.useState(false)
  const [connectionError, setConnectionError] = React.useState(false)
  const [open2, setOpen2] = React.useState(false);
  
  

  const share = () => {
    if (navigator.share) {
      var myblob = new Blob([qrcanvas], {
        type: 'image/svg+xml'
      });
      const myfile = new File([myblob], "qr.svg", {
        type: "image/svg+xml",
      })
      navigator.share({
        title: `Furniture 3D : ${currentItem.title}`,
        text: "Scan the QR code via Furniture 3D app.",
        files: [myfile] 
        
      })
      .then(() => console.log('Successful share'))
      .catch(error => console.log('Error sharing:', error));
    }
  }


  const handleOpen2 = () => {
    setOpen2(true);
}

  const handleClose2 = () => {
      setDeviceError(false)
      setConnectionError(false)
      setOpen2(false);
  };

  const handleError = err => {
    setDeviceError(true)
}


const handleScan = (data) => {
       
  if(data){
      const model = JSON.parse(data)
      if(model.model_url){
        setDeviceError(false)
        setConnectionError(false)
        window.open(`intent://arvr.google.com/scene-viewer/1.0?file=${model.model_url}&title=${model.title}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`);
        setOpen2(false)
      }else{
        return
      }
      
  }
      
}

  const handleClickOpen1 = (element) => {
    setCurrentItem(element)
    QRCode.toString(JSON.stringify({model_url:element.model_url, title: element.title}),(err,data)=>{
      setQrcanvas(data)
  })
    setOpen1(true);
  };

  const handleClose1 = () => {
    setCurrentItem({})
    setQrcanvas('')
    setOpen1(false);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = () =>{
    window.print()
  }

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
        <div style={{ marginBottom: "146px" }}>
          {models.length === 0 ? (
            <div style={{ marginTop: "25vh" }}>
              {" "}
              <center>
                <img
                  style={{ width: "200px", height: "200px" }}
                  alt=""
                  src="/nomodel.svg"
                />

                <Typography variant="h5" style={{ color: "#495057" }}>
                  No Models
                </Typography>
              </center>
            </div>
          ) : (
            <div>
              {models.map((element) => (
                <div
                  key={element._id}
                  style={{ padding: "18px 16px 0px 16px" }}
                >
                  <Card variant="outlined" style={{ borderRadius: "18px" }}>
                    <Grid container spacing={0} style={{ height: "150px" }}>
                      <Grid item xs={4}>
                        
                        
                        
                         
                      
                        <img
                          src={element.image_url}
                          draggable={false}
                          width="100%"
                          height="150px"
                          alt=""
                          style={{
                            objectFit: "fill",
                            borderTopRightRadius: "18px",
                            borderBottomRightRadius: "18px",
                          }}
                        />
                        
                      </Grid>
                      <Grid item xs={8}>
                      <div style={{right:'8px',position:'absolute'}}>
                            <IconButton
                                disableFocusRipple
                                disableTouchRipple
                                disableRipple
                      
                                onClick={()=>handleClickOpen1(element)}
                              >
                                <MoreIcon />
                              </IconButton>
                          </div>
                        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100%" }}>
                        <center>
                          <Typography
                            variant="body1"
                            style={{
                              color: "#495057",
                              fontSize: "19px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {element.title}
                          </Typography>
                         
                          <Typography
                            variant="body2"
                            style={{ color: "#6c757d" }}
                          >
                            <em>{element.description}</em>
                          </Typography>
                          <div
                            style={{ marginBottom: "6px" }}
                          />
                          <Button variant="outlined" color="primary" style={{textTransform:'none', borderRadius:"8px", position:"relative", bottom:"0"}}>
                            <a
                              style={{
                                textDecoration: "none",
                                color: "rgb(63,81,181)",
                              }}
                              href={`intent://arvr.google.com/scene-viewer/1.0?file=${element.model_url}&title=${element.title}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`}
                            >
                              <div style={{display:'flex', flexDirection:"row"}}><CenterFocusWeakIcon style={{}} /> <Typography>&nbsp;View in 3D</Typography> </div>
                            </a>
                          </Button>
                          </center>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Fab
        color="primary"
        onClick={handleOpen2}
        style={{ position: "fixed", right: "16px", bottom: 80 }}
      >
        <img src='qr.svg' alt='' width="22px" height="22px"/>
      </Fab>

      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} style={{ position: "sticky" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create Model
            </Typography>
          </Toolbar>
        </AppBar>
        <AddModel handleClose={handleClose} loadTasks={loadTasks} />
      </Dialog>

      <Dialog
        style={{ background: "rgba(0,0,0,0.6)" }}
        open={open1}
        onClose={handleClose1}
        TransitionComponent={Transition}
      >
      <div style={{width: "300px"}}>
      <div style={{ padding: "8px 8px 8px 8px" }}>
          <Typography className="infoTitle" variant='h5' style={{color:"rgb(63,81,181)"}}>
             Info <InfoIcon style={{transform:"translateY(3px)"}} />
          </Typography>
          <Divider style={{ background:"rgb(63,81,181)", marginBottom: "12px" }} />
          
                    
                        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100%" }}>
                        <center>
                          <Typography
                            variant="body1"
                            style={{
                              color: "#495057",
                              fontSize: "19px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {currentItem.title}
                          </Typography>
                         
                          <Typography
                            variant="body2"
                            style={{ color: "#6c757d" }}
                          >
                            <em>{currentItem.description}</em>
                          </Typography>
                       
                         
                          
                          
                          <div
                            style={{ marginBottom: "6px" }}
                          />
                          </center>
                        </div>
                        
                        <Card variant="outlined" style={{ borderRadius: "4px" }}>
                    
                    {
                        (qrcanvas === '')?<div />
                        : <center><div style={{width:"270px",height:"270px"}} dangerouslySetInnerHTML={{ __html: qrcanvas }}>
                        </div></center>
                    }
                    
                    
                  </Card>
                  <div style={{marginTop:"12px"}}>
                  <center>
                  <Typography variant="body1" style={{color:"rgb(63,81,181)"}}>
                      Scan QR-Code to render the model
                    </Typography>
                  </center>
                  </div>
                  <div style={{margin:"12px"}}>
                    
                  <center>
                    <Button size="small" className="printButton" variant="outlined" color="primary" style={{ borderRadius:"4px", position:"relative", bottom:"0"}} onClick={handlePrint}>
                            
                              <div style={{display:'flex', flexDirection:"row"}}><PrintIcon />&nbsp;PRINT </div>
                           
                     </Button>
                     <Button className="printButton" style={{marginLeft:"18px"}} size="small" variant="outlined" color="primary" onClick={share}><ShareIcon />&nbsp;Share</Button>
                    </center>
                    </div>
          </div>
      </div>
      
      </Dialog>
      <Dialog
            TransitionComponent={Transition}
            style={{ background: "rgba(0,0,0,0.6)" }}
            fullWidth={true}
            maxWidth={'sm'}
            open={open2}
            onClose={handleClose2}
        >
            <div style={{padding:"12px"}}>
                <Typography style={{color:"rgb(63,81,181)"}}>
                    Scan QR code
                </Typography>     
            </div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            {deviceError && <Alert severity="error">No Camera found</Alert>}

            {connectionError && <Alert severity="warning">Something went wrong</Alert>}
        </Dialog>
    </div>
  );
}

export default HomeView;
