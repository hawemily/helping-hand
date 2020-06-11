import React from "react"
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {Button, CardColumns, CardGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import CardDeck from "react-bootstrap/CardDeck";

const LearnMore = (props) => {

    const infoCards = [
        {
            title: "Why did we create HelpingHand?",
            body: "Due to the preventative measures taken as a result of the coronavirus, 2.16 million people have been told not to\n" +
                "leave their house until at least the end of June,\n" +
                "meaning they can no longer access essential services themselves. Not everyone in this group is able to get help\n" +
                "from friends and family to get their groceries, medicine or other essentials.\n" +
                "There are also many more vulnerable groups who are moderately at risk from Covid-19 and do not qualify\n" +
                "for support from the government, including over 107,000 people who were recently removed from the NHS shielding list.\n" +
                "We wanted to provide support for these groups of at risk individuals who may not have access to the\n" +
                "service of others while also giving eager volunteers a platform to do their part for their community",
            cardStyle: "why-card"
        },
        {
            title: "How can you help your community?",
            body: "We have set up a platform where you will be connected with at risk individuals in your area.\n" +
                "You can view different requests that they have submitted. Among the services this platform currently\n" +
                "offers are a grocery service where you buy groceries or a laundry service where you \n" +
                "carry out the laundry services for people in need. You will receive information about the person \n" +
                "you have agreed to help and can always contact them for additional information about the tasks.\n" +
                "Thank you very much for your interest and we do hope you sign up to help at risk individual with their essential needs.",
            cardStyle: "how-card"
        },
        {
            title: "How can you receive help?",
            body: "You can sign up to receive help with essential tasks that involve leaving the house as we understand\n" +
                "what a risk this poses for you. Among the tasks you can request for help for are Groceries, where a helpful\n" +
                "volunteer purchases your groceries from a local supermarket and delivers them to your house or a laundry service\n" +
                "where a volunteer picks up and delivers fresh laundry to you. We understand that these are scary and dangerous \n" +
                "times and hope that our platform can help improve your lives in a small and significant way.",
            cardStyle: "other-how-card"
        }
    ]
    return (
        <div>
            <div className='people'>
                <h1 className='header'>Learn More</h1>
                <p className='body'>Need more information about our cause?</p>
            </div>
            <Container fluid classname='banner text-center' style={{
                marginTop: '50px',
                justifyContent: 'center'
            }}>
                <CardDeck classname='card-deck'>
                    {infoCards.map((option) => (
                        <Card fluid
                        className={option.cardStyle}
                        style={{
                            marginTop: '15px',
                            textAlign: 'center',
                            height: 'auto',
                            marginBottom:'15px'
                        }}>
                                <Card.Body>
                                    <Card.Header><h4>{option.title}</h4></Card.Header>
                                    <Card.Text><p style={{
                                        marginTop: '20px',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        fontSize: "1.3rem"
                                    }}>{option.body}</p></Card.Text>
                                </Card.Body>
                        </Card>

                    ))}
                </CardDeck>
                <Button
                    center
                    outline
                    variant='dark'
                    tag={Link}
                    href='/'
                >Back to Main Page</Button>
            </Container>
        </div>
    );
};

export default LearnMore;