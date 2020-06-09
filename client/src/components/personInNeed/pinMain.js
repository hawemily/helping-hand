import React from "react";
import Services from "./pinServiceOptions";

const PinMain = (props) => {
  return (
    <div>
      <div className='background'>
        <h1 className='header'>Get Help</h1>
        <p className='body'>Contact-free support, whenever, wherever.</p>
      </div>
      <h4 className='section-title'>What do you need help with?</h4>
      <Services auth={props.auth}/>
    </div>
  );
};

export default PinMain;
