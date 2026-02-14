import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
        <Container className="mt-5">
            <Helmet>
                <title>About Us - Skill2Hire</title>
            </Helmet>
            <h1>About Us</h1>
            <p className="lead">Skill2Hire is a dedicated job notification platform designed to provide the latest updates on Government and Private sector openings.</p>
            <p><strong>Our Mission:</strong> To bridge the gap between job seekers and opportunities by providing fast, accurate, and verified job alerts.</p>
            <p><strong>Important Note:</strong> Skill2Hire is <u>NOT</u> an application portal. We do not accept or process job applications. We strictly provide links to official government or company websites where users can apply directly.</p>
        </Container>
    );
};

export default About;
