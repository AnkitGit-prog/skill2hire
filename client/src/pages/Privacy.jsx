import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
    return (
        <Container className="mt-5">
            <Helmet>
                <title>Privacy Policy - CareerFast</title>
            </Helmet>
            <h1>Privacy Policy</h1>
            <p>At CareerFast, accessible from careerfast.com, one of our main priorities is the privacy of our visitors.</p>
            <h3>Information We Collect</h3>
            <p>We do not collect personal information like names, email addresses, or phone numbers unless you voluntarily contact us. We may use cookies for ad personalization via Google AdSense.</p>
            <h3>External Links</h3>
            <p>Our website contains links to other websites (official Government/Company portals). We are not responsible for the privacy policies or content of these third-party sites.</p>
        </Container>
    );
};

export default Privacy;
