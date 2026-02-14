import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = ({ type }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
                // Filter jobs based on type prop if provided
                const filteredJobs = type
                    ? res.data.filter(job => job.type.toLowerCase() === type.toLowerCase())
                    : res.data;
                setJobs(filteredJobs);
            } catch (err) {
                console.error(err);
            }
        };
        fetchJobs();
    }, [type]);

    return (
        <Container className="mt-4">
            <h2 className="mb-4">{type ? `${type} Jobs` : 'All Jobs'}</h2>
            <Row>
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <Col md={6} lg={4} key={job._id} className="mb-4">
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>{job.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{job.organization}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Location:</strong> {job.location || 'India'}<br />
                                        <strong>Last Date:</strong> {job.lastDate ? new Date(job.lastDate).toLocaleDateString() : 'N/A'}
                                    </Card.Text>
                                    <Link to={`/job/${job._id}`}>
                                        <Button variant="outline-primary" size="sm">View Details</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No jobs found.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Jobs;
