import React from "react";
import { useStateValue } from "./StateProvider";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { AppBar, Typography, Toolbar, IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Task from "./Task";
import FilterIcon from '@material-ui/icons/Filter';
import PersonIcon from "@material-ui/icons/Person";
import Profile from "./Profile";
import axios from "axios";
import HomeView from "./HomeView";
import AddIcon from "@material-ui/icons/Add";
import io from "socket.io-client";
import WorkerSetup from './workerSetup'

const socket = io("http://192.168.29.179:8080/");

const useStyles = makeStyles({
  navcontainer: {
    // width: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "fixed",
    bottom: 12,
  },
  nav: {
    width: "91%",
    borderRadius: "18px",
    borderStyle: "solid",
    borderColor: "rgba(63,81,181,0.3)",
    overflow: "hidden",
  },
});

function Home() {
  const classes = useStyles();
  const [state] = useStateValue();
  const [value, setValue] = React.useState(0);
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(true);
  const [profile, setProfile] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [isLoadingTask, setIsLoadingTask] = React.useState(true);
  const [models, setModels] = React.useState([]);
  const [isLoadingModel, setIsLoadingModel] = React.useState(true);
  const [profileError, setProfileError] = React.useState(false);
  const [taskError, setTaskError] = React.useState(false);
  const [modelError, setModelError] = React.useState(false)
  

  const loadTasks =() =>{
    setTaskError(false)
    axios
      .get("http://192.168.29.179:8080/api/model/pending", {
        headers: {
          "auth-token": state.token,
        },
      })
      .then((res) => {
        setIsLoadingTask(false);
        setTasks(res.data);
      })
      .catch((error) => {
        setIsLoadingTask(false);
        setTaskError(true)
      });
  }

  const loadModels =() =>{
    setModelError(false)
    axios
    .get("http://192.168.29.179:8080/api/model/completed", {
      headers: {
        "auth-token": state.token,
      },
    })
    .then((res) => {
      setIsLoadingModel(false);
      setModels(res.data);
    })
    .catch((error) => {
      setIsLoadingModel(false)
      setModelError(true)
    });
  }

  React.useEffect(() => {
    setProfileError(false)
    axios
      .get("http://192.168.29.179:8080/api/auth/profile", {
        headers: {
          "auth-token": state.token,
        },
      })
      .then((res) => {
        setIsLoadingProfile(false);
        setProfile(res.data);
      })
      .catch((error) => {
        setIsLoadingProfile(false);
        setProfileError(true)
      });
  }, [state]);

  React.useEffect(() => {
    loadModels()
  }, []);


  React.useEffect(() => {
    loadTasks()
  },[]);

  React.useEffect(() => {
    setTimeout(function(){ WorkerSetup(state) }, 5000);
  }, [state])  

  React.useEffect(() => {
    socket.emit("join_room", { user_id: state._id } )
    socket.on("reload",() => {
      loadModels()
      loadTasks()
    })
  }, [])  

  return (
    <div>
      {value === 0 && <div>
        <AppBar style={{position:"sticky"}}>
          <Toolbar>
            <Typography variant="h6">
              Models
            </Typography>
            <div style={{width:'100%', display:'flex', alignItems:'flex-end',flexDirection:'column'}}>
              <IconButton style={{transform:'translateX(10px)', color:'#fff'}} onClick={()=>setOpen(true)}>
                <AddIcon  />
              </IconButton>
            </div>
            
          </Toolbar>
        </AppBar><HomeView models={models} eror={modelError} isLoading={isLoadingModel} loadTasks={loadTasks} open={open} setOpen={setOpen}/></div>}
      {value === 1 && <div>
        <AppBar style={{position:"sticky"}}>
          <Toolbar>
            <Typography variant="h6">
              Pending Tasks
            </Typography>
          </Toolbar>
        </AppBar> <Task tasks={tasks} eror={taskError} isLoading={isLoadingTask} /></div>}
      {value === 2 && (
        <div>
        <AppBar style={{position:"sticky"}}>
          <Toolbar>
            <Typography variant="h6">
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <Profile profile={profile} eror={profileError} isLoading={isLoadingProfile} />
        </div>
      )}

      <div className={classes.navcontainer}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            window.scrollTo(0, 0);
            setValue(newValue);
          }}
          showLabels
          className={classes.nav}
        >
          {/* #e9ecef */}
          <BottomNavigationAction
            style={{ background: "rgba(63,81,181,0.05)" }}
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            style={{ background: "rgba(63,81,181,0.05)" }}
            label="Tasks"
            icon={<FilterIcon />}
          />
          <BottomNavigationAction
            style={{ background: "rgba(63,81,181,0.05)" }}
            label="Profile"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default Home;
