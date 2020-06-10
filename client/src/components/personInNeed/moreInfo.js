import React from "react";
import { Tooltip, OverlayTrigger, Image } from "react-bootstrap";
import info from "../../assets/general/info_button.jpg";

function renderTooltip(message) {
  return (
    <Tooltip id="button-tooltip">
      {message}
    </Tooltip>
  );
}

const InformationTooltip = (props) => (
  <OverlayTrigger
    placement="bottom"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip(props.message)}
  >
    <div className='info-button'>
      <Image src={info} rounded fluid />
    </div>
  </OverlayTrigger>
);

export default InformationTooltip;
