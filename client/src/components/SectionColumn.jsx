import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const SectionColumn = ({ title, jobs, headerClass = "bg-primary" }) => {
    // Generate gradient class based on base color class
    let gradientStyle = {};
    if (headerClass.includes('bg-danger')) gradientStyle = { background: 'linear-gradient(45deg, #e63946, #dc2626)' };
    else if (headerClass.includes('bg-warning')) gradientStyle = { background: 'linear-gradient(45deg, #f59e0b, #d97706)', color: '#000' };
    else if (headerClass.includes('bg-dark')) gradientStyle = { background: 'linear-gradient(45deg, #1f2937, #111827)' };
    else gradientStyle = { background: 'linear-gradient(45deg, #0d2249, #2563eb)' };

    return (
        <Card className="mb-4 h-100 shadow-sm border-0 rounded-3 overflow-hidden hover-card">
            <Card.Header className="text-white text-center fw-bold py-3 border-0" style={gradientStyle}>
                <h5 className="m-0" style={{ fontFamily: 'Poppins', letterSpacing: '0.5px' }}>{title}</h5>
            </Card.Header>
            <ListGroup variant="flush">
                {jobs.map(job => (
                    <ListGroup.Item key={job._id} className="p-0 border-bottom-0">
                        <Link to={`/job/${job._id}`} className="text-decoration-none text-dark d-flex align-items-center p-3 hover-bg-light transition-all border-bottom">
                            <FaChevronRight className="text-muted me-2 small" size={12} />
                            <div className="text-truncate flex-grow-1 fw-medium">{job.title}</div>
                            {new Date(job.createdAt) > new Date(Date.now() - 86400000 * 2) &&
                                <Badge bg="danger" className="ms-2 rounded-pill" style={{ fontSize: '0.6rem' }}>NEW</Badge>
                            }
                        </Link>
                    </ListGroup.Item>
                ))}
                {jobs.length === 0 && <ListGroup.Item className="text-center text-muted py-4 small">No updates available</ListGroup.Item>}
            </ListGroup>
            <Card.Footer className="bg-white text-center border-0 py-3">
                <Link to="#" className="btn btn-outline-primary btn-sm rounded-pill px-4">View All</Link>
            </Card.Footer>
        </Card>
    );
};

export default SectionColumn;
