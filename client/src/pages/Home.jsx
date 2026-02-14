import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { FaWhatsapp, FaTelegramPlane, FaSearch, FaBriefcase } from 'react-icons/fa';
import Search from '../components/Search';
import AdSpace from '../components/AdSpace';
import SectionColumn from '../components/SectionColumn';
import NewsTicker from '../components/NewsTicker';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [govtJobs, setGovtJobs] = useState([]);
    const [privateJobs, setPrivateJobs] = useState([]);
    const [admitCards, setAdmitCards] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
                setJobs(res.data);

                // Filter jobs by category
                const latest = res.data.filter(j => j.category === 'Latest Jobs' || !j.category);
                setGovtJobs(latest.filter(j => j.type === 'Govt'));
                setPrivateJobs(latest.filter(j => j.type === 'Private'));

                setAdmitCards(res.data.filter(j => j.category === 'Admit Card'));
                setResults(res.data.filter(j => j.category === 'Results'));
            } catch (err) {
                console.error(err);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="bg-light min-vh-100">
            <Helmet>
                <title>Skill2Hire – Professional Job Alerts</title>
                <meta name="description" content="India's leading job notification platform. Get instant updates on Govt Jobs, Private Jobs, Admit Cards and Results." />
            </Helmet>

            <NewsTicker />

            {/* Hero Section */}
            <div className="text-white py-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d2249 0%, #2563eb 100%)' }}>
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <Container className="text-center position-relative z-1">
                    <h1 className="display-4 fw-bold mb-3 animate-fade-in" style={{ fontFamily: 'Poppins' }}>Find Your Dream Career</h1>
                    <p className="lead mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>We provide trusted job notifications and updates instantly.</p>

                    <div className="d-flex justify-content-center mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <div className="bg-white p-2 rounded-pill shadow-lg d-flex align-items-center w-100" style={{ maxWidth: '600px' }}>
                            <FaSearch className="text-muted ms-3" />
                            <div className="flex-grow-1">
                                <Search />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <Button variant="success" size="lg" className="d-flex align-items-center rounded-pill px-4 shadow-sm hover-scale" href="https://whatsapp.com" target="_blank">
                            <FaWhatsapp className="me-2" /> WhatsApp
                        </Button>
                        <Button variant="light" size="lg" className="d-flex align-items-center rounded-pill px-4 shadow-sm hover-scale text-primary fw-bold" href="https://t.me/Skill2Hire" target="_blank">
                            <FaTelegramPlane className="me-2" /> Telegram
                        </Button>
                    </div>
                </Container>
            </div>

            <AdSpace slot="header-slot" />

            {/* Main Content */}
            <Container className="mt-5 pb-5">
                <Row className="gy-4">
                    <Col lg={3} md={6}>
                        <SectionColumn title="Govt Jobs" jobs={govtJobs} headerClass="bg-danger" />
                    </Col>
                    <Col lg={3} md={6}>
                        <SectionColumn title="Private Jobs" jobs={privateJobs} headerClass="bg-warning text-dark" />
                    </Col>
                    <Col lg={3} md={6}>
                        <SectionColumn title="Admit Card" jobs={admitCards} headerClass="bg-primary" />
                    </Col>
                    <Col lg={3} md={6}>
                        <SectionColumn title="Results" jobs={results} headerClass="bg-dark" />
                    </Col>
                </Row>

                <AdSpace format="horizontal" />

                {/* Categories / Quick Access */}
                <div className="mt-5 text-center">
                    <h3 className="mb-4">Browse by Category</h3>
                    <Row className="justify-content-center g-3">
                        {['10th Pass', '12th Pass', 'Graduate', 'Diploma', 'Engineering', 'Medical', 'Teaching', 'Police'].map((cat, idx) => (
                            <Col key={idx} width="auto" xs={6} md={3} lg={2}>
                                <Button variant="outline-primary" className="w-100 rounded-pill py-2 shadow-sm text-truncate">
                                    {cat}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Featured Section */}
                {jobs.some(j => j.isFeatured) && (
                    <div className="mt-5">
                        <div className="d-flex align-items-center mb-4">
                            <div className="bg-warning rounded-circle p-2 me-2 text-dark"><FaBriefcase /></div>
                            <h3 className="m-0">Featured Updates</h3>
                        </div>
                        <Row>
                            {jobs.filter(j => j.isFeatured).map(job => (
                                <Col md={12} key={job._id} className="mb-3">
                                    <div className="bg-white p-3 rounded shadow-sm border-start border-5 border-warning d-flex align-items-center hover-card">
                                        <div className="flex-grow-1">
                                            <h5 className="m-0 text-primary fw-bold">{job.title}</h5>
                                            <small className="text-muted">{job.organization} • {job.type}</small>
                                        </div>
                                        <Button size="sm" variant="dark" className="rounded-pill px-3">View</Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Home;
