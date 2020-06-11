import React from "react";
import {Navbar, Nav, Container, ButtonToolbar, Button} from "react-bootstrap";
import {FaPhoneAlt, FaEnvelope, FaExclamationCircle} from "react-icons/fa";
import {IconContext} from "react-icons";
import Col from "react-bootstrap/Col";


const ContactUsBar = (props) => {

    const icons = [
        {
            phone: true,
            header: "0700 000 0000",
            body: "Chat with one of us about your needs."
        },
        {
            phone: false,
            header: "info@helpinghand.co.uk",
            body: "Get support or report an issue via email."
        }
    ]

    return (
        <div>
            <Navbar sticky='bottom' bg='dark' dark style={{
                borderTop: "1px solid #E7E7E7",
                textAlign: "left",
                height: "auto",
                width: "100%",
                color: "#F8F8F8",
                marginTop: "30px"
            }}>
                <Container fluid style={{
                    paddingTop: "10px",
                }}>
                <Col>
                    <h6> Always here to help! Contact us at: </h6>
                    <thead>
                    <tbody>
                    {icons.map((icon) => (
                        <tr className='align-middle'>
                            <td>
                                <IconContext.Provider value={{ style: { fontSize: "45px"} }}>
                                    <div>
                                        {icon.phone ? <FaPhoneAlt/> : <FaEnvelope/>}
                                    </div>
                                </IconContext.Provider>
                            </td>
                            <td className='align-middle' style={{
                                paddingLeft: "10px"
                            }}>
                                <p style={{
                                    margin: '10px'
                                }}>
                                <p style={{
                                    margin: '-5px'
                                }}>
                                    <h5>{icon.header}</h5></p>
                                <p style={{
                                    margin: '-5px'
                                }}>
                                    <h6>{icon.body}</h6></p></p>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    </thead>
                </Col>
                </Container>
            </Navbar>
        </div>
    );
};

export default ContactUsBar;