import React, { useState } from 'react';
import { Container, Card, Form, Button, ProgressBar, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaFileUpload, FaMagic, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ResumeScorer = () => {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setAnalysis(null);
        setError('');
    };

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please upload a resume (PDF) first.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        setLoading(true);
        setError('');

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/resume/analyze`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAnalysis(res.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to analyze resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold gradient-text">AI Resume Scorer</h1>
                <p className="lead text-muted">Upload your resume and let our AI analyze it instantly.</p>
            </div>

            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg border-0 mb-4">
                        <Card.Body className="p-4">
                            <Form onSubmit={handleAnalyze}>
                                <div className="mb-4 text-center p-5 border border-2 border-dashed rounded bg-light">
                                    <FaFileUpload size={40} className="text-primary mb-3" />
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label className="fw-bold">Upload Resume (PDF)</Form.Label>
                                        <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
                                    </Form.Group>
                                    <small className="text-muted">Supported format: PDF only</small>
                                </div>

                                <div className="d-grid">
                                    <Button variant="primary" size="lg" type="submit" disabled={loading || !file} className="rounded-pill">
                                        {loading ? (
                                            <>Converting & Analyzing...</>
                                        ) : (
                                            <><FaMagic className="me-2" /> Analyze Now</>
                                        )}
                                    </Button>
                                </div>
                                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {analysis && (
                <Row className="justify-content-center animate-fade-in">
                    <Col md={10}>
                        <Card className="shadow border-0">
                            <Card.Body className="p-5">
                                <Row className="align-items-center mb-4">
                                    <Col md={4} className="text-center border-end">
                                        <h2 className="display-4 fw-bold text-primary">{analysis.score}/100</h2>
                                        <p className="text-muted">Overall Score</p>
                                        <ProgressBar now={analysis.score} variant={analysis.score > 70 ? "success" : "warning"} className="mb-2" style={{ height: '10px' }} />
                                    </Col>
                                    <Col md={8}>
                                        <h4 className="fw-bold mb-3">AI Summary</h4>
                                        <p className="text-muted">{analysis.summary}</p>
                                    </Col>
                                </Row>

                                <hr />

                                <Row className="mt-4">
                                    <Col md={6}>
                                        <h5 className="text-success fw-bold mb-3"><FaCheckCircle className="me-2" /> Strengths</h5>
                                        <ul className="list-unstyled">
                                            {analysis.strengths.map((item, idx) => (
                                                <li key={idx} className="mb-2 d-flex align-items-start">
                                                    <span className="text-success me-2">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </Col>
                                    <Col md={6}>
                                        <h5 className="text-warning fw-bold mb-3"><FaExclamationTriangle className="me-2" /> Areas for Improvement</h5>
                                        <ul className="list-unstyled">
                                            {analysis.improvements.map((item, idx) => (
                                                <li key={idx} className="mb-2 d-flex align-items-start">
                                                    <span className="text-warning me-2">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ResumeScorer;
