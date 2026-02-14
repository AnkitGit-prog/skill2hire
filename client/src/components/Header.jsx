import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserShield, FaHome, FaMagic } from 'react-icons/fa';

const Header = () => {
    return (
        <Navbar expand="lg" className="sticky-top glass-effect py-3 shadow-sm" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img src="/logo.svg" alt="Skill2Hire Logo" height="40" className="me-2" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-3">
                        <Nav.Link as={Link} to="/" className="fw-medium text-dark"><FaHome className="me-1" /> Home</Nav.Link>
                        <Nav.Link as={Link} to="/govt-jobs" className="fw-medium text-dark">Govt Jobs</Nav.Link>
                        <Nav.Link as={Link} to="/private-jobs" className="fw-medium text-dark">Private Jobs</Nav.Link>
                        <Nav.Link as={Link} to="/resume-scorer" className="fw-medium text-primary fw-bold">
                            <FaMagic className="me-1" /> AI Resume Check
                        </Nav.Link>
                        <Button as={Link} to="/login" variant="outline-primary" size="sm" className="rounded-pill px-4">
                            Login / Register
                        </Button>
                        <Nav.Link as={Link} to="/admin/login" className="fw-medium text-muted small">
                            <FaUserShield className="me-1" /> Admin
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
