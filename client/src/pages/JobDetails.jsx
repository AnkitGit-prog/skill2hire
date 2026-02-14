import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { FaExternalLinkAlt } from 'react-icons/fa';
import AdSpace from '../components/AdSpace';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`);
                setJob(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchJob();
    }, [id]);

    if (!job) return <div className="text-center mt-5">Loading...</div>;

    return (
        <Container className="mt-5">
            <Helmet>
                <title>{job.title} - CareerFast</title>
                <meta name="description" content={`Apply for ${job.title}. ${job.vacancies} vacancies.`} />
            </Helmet>

            <AdSpace slot="header-slot" />

            <Card className="shadow-lg border-0">
                <Card.Header className="bg-primary text-white py-3">
                    <h3 className="m-0 text-center">{job.title}</h3>
                </Card.Header>
                <Card.Body className="p-4">
                    <div className="text-center mb-4">
                        <h4 className="text-muted">{job.organization}</h4>
                        <span className="badge bg-warning text-dark fs-6 mt-2">{job.type} Job</span>
                    </div>

                    <AdSpace format="horizontal" />

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Vacancies:</strong> {job.vacancies}</li>
                                <li className="list-group-item"><strong>Qualification:</strong> {job.qualification}</li>
                                <li className="list-group-item"><strong>Salary:</strong> {job.salary}</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Age Limit:</strong> {job.ageLimit}</li>
                                <li className="list-group-item"><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}</li>
                            </ul>
                        </div>
                    </div>

                    <hr />
                    <h5 className="text-primary mt-4">Job Description & Details</h5>
                    <p className="lead fs-6">{job.description}</p>

                    <AdSpace format="rectangle" />

                    <div className="d-grid gap-2 col-md-8 mx-auto mt-5">
                        <h5 className="text-center text-danger mb-3">Important Links</h5>

                        {job.notificationLink && (
                            <Button variant="outline-danger" size="lg" href={job.notificationLink} target="_blank">
                                <FaExternalLinkAlt className="me-2" /> Download Official Notification
                            </Button>
                        )}

                        <Button variant="success" size="lg" href={job.applyLink || '#'} target="_blank" disabled={!job.applyLink}>
                            <FaExternalLinkAlt className="me-2" /> Apply on Official Website
                        </Button>

                        <Alert variant="warning" className="text-center mt-2 small">
                            <strong>Note:</strong> CareerFast is a job notification platform. We do not collect applications.
                            Clicking "Apply" will redirect you to the official organization's website.
                        </Alert>
                    </div>
                </Card.Body>
            </Card>

            <AdSpace slot="footer-slot" />
        </Container>
    );
};

export default JobDetails;
