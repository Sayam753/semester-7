import React from "react";
import "./App.css";
import MainRoute from "./main/MainRoute";

import { UserStateProvider } from "./main/StateProvider";
import userreducer, { userinitialState } from "./main/reducer";

function App() {
 
  return (
    <UserStateProvider initialState={userinitialState} reducer={userreducer}>
      <MainRoute />
    </UserStateProvider>
  );
}

export default App;
