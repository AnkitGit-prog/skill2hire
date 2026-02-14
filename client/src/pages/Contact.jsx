import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    return (
        <Container className="mt-5">
            <Helmet>
                <title>Contact Us - CareerFast</title>
            </Helmet>
            <h1>Contact Us</h1>
            <p>If you have any questions, suggestions, or need to report an error, please contact us via email.</p>
            <p><strong>Email:</strong> support@careerfast.com</p>
            <p>We aim to respond to all inquiries within 24-48 hours.</p>
        </Container>
    );
};

export default Contact;
