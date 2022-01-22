import React from 'react';
import { useStateValue } from './StateProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './Home'
import Login from './Login'
import Register from './Register'
import NotFoundView from './NotFoundView'
// import MyCourse from './MyCourse'
// import Setting from './Setting'


function MainRoute() {
  const [state] = useStateValue();
 
  return (
    
    <Router>
     <Switch>
        <Route exact path={`/`}>
        {!state.isLoggedin?<Redirect
            to={{
              pathname: `/login`,
            }}
          />:<Home />}
          </Route>

          <Route path={`/login`}>
          {state.isLoggedin?<Redirect
            to={{
              pathname: `/`,
            }}
          />:<Login />}
          </Route>

          <Route path={`/register`}>
          {state.isLoggedin?<Redirect
            to={{
              pathname: `/`,
            }}
          />:<Register />}
        </Route>


        
          
          <Route path="*">
            <NotFoundView />
          </Route>

         


          {/* <Route path={`/mycourses`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `/login`,
            }}
          />:<MyCourse />}
          </Route> */}

          {/* <Route path={`/settings`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `/login`,
            }}
          />:<Setting />}
          </Route> */}

          {/* <Route path={`${path}/settings`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Settings />}
          </Route>

          <Route path={`${path}/orders`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Order />}
          </Route>


          <Route path={`${path}/orderdetail`}>
          {!state.isLoggedin?<Redirect
            to={{
              pathname: `${path}/login`,
            }}
          />:<Order isDetailView={true} />}
          </Route> */}

          
      
       
        </Switch>
    
    </Router>
   
  );
}

export default MainRoute

