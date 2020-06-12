import React from "react";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./main.scss";
import ContactUsBar from "./components/general/ContactUsBar";

function App() {

  return (
    <div className='App'>
      <div className="app-wrapper">
        <Routes />
      </div>
      <ContactUsBar />
    </div>
  );
}

export default App;
