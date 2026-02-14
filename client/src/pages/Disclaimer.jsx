import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const Disclaimer = () => {
    return (
        <Container className="mt-5">
            <Helmet>
                <title>Disclaimer - CareerFast</title>
            </Helmet>
            <h1>Disclaimer</h1>
            <div className="alert alert-warning border-warning">
                <strong>Important:</strong> CareerFast is an informational platform only.
            </div>
            <p>We make every effort to provide accurate and up-to-date information. However, CareerFast does not guarantee the accuracy, completeness, or reliability of any information found on this site.</p>
            <p>Users are strictly advised to <strong>verify all details (dates, fees, eligibility) from the Official Notification</strong> before applying.</p>
            <p>CareerFast is not associated with any Government body or private company. We are solely a news and notification aggregator.</p>
        </Container>
    );
};

export default Disclaimer;
