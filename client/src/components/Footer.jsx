import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5 shadow-lg">
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h4 className="text-white mb-3" style={{ fontFamily: 'Poppins' }}>SKILL2HIRE</h4>
                        <p className="text-secondary small">
                            India's most trusted job notification platform. We provide the latest updates on Government Jobs, Private Jobs, Admit Cards, and Results.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-light hover-opacity"><FaFacebook size={20} /></a>
                            <a href="#" className="text-light hover-opacity"><FaTwitter size={20} /></a>
                            <a href="#" className="text-light hover-opacity"><FaLinkedin size={20} /></a>
                            <a href="#" className="text-light hover-opacity"><FaInstagram size={20} /></a>
                        </div>
                    </Col>
                    <Col md={2} className="mb-4">
                        <h6 className="text-primary mb-3 text-uppercase fw-bold">Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none hover-white">Home</Link></li>
                            <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none hover-white">About Us</Link></li>
                            <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none hover-white">Contact</Link></li>
                            <li className="mb-2"><Link to="/admin" className="text-secondary text-decoration-none hover-white">Admin Login</Link></li>
                        </ul>
                    </Col>
                    <Col md={3} className="mb-4">
                        <h6 className="text-primary mb-3 text-uppercase fw-bold">Categories</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><Link to="/govt-jobs" className="text-secondary text-decoration-none hover-white">Government Jobs</Link></li>
                            <li className="mb-2"><Link to="/private-jobs" className="text-secondary text-decoration-none hover-white">Private Sector</Link></li>
                            <li className="mb-2"><a href="#" className="text-secondary text-decoration-none hover-white">Admit Cards</a></li>
                            <li className="mb-2"><a href="#" className="text-secondary text-decoration-none hover-white">Exam Results</a></li>
                        </ul>
                    </Col>
                    <Col md={3} className="mb-4">
                        <h6 className="text-primary mb-3 text-uppercase fw-bold">Important</h6>
                        <p className="small text-secondary mb-2">
                            <strong>Disclaimer:</strong> We are an information platform and not affiliated with any government body.
                        </p>
                        <p className="small text-secondary">
                            <Link to="/privacy" className="text-secondary text-decoration-none">Privacy Policy</Link> |
                            <Link to="/disclaimer" className="text-secondary text-decoration-none ms-1">Disclaimer</Link>
                        </p>
                        <a href="https://t.me/Skill2Hire" className="btn btn-outline-primary btn-sm mt-2 rounded-pill w-100" target="_blank" rel="noopener noreferrer">
                            <FaTelegramPlane className="me-2" /> Join Telegram
                        </a>
                    </Col>
                </Row>
                <hr className="border-secondary" />
                <div className="text-center small text-secondary">
                    &copy; {new Date().getFullYear()} Skill2Hire. All Rights Reserved.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
