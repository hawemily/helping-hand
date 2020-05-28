import React from "react";
import NavBar from "./components/NavBar";
import Volunteer from "./components/Volunteer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Volunteer />
    </div>
  );
}

export default App;
