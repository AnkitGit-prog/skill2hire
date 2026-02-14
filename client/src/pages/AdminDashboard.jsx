import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        title: '', organization: '', type: 'Govt', vacancies: '', description: '', notificationLink: '', applyLink: '', category: 'Latest Jobs', isFeatured: false
    });
    const navigate = useNavigate();

    const fetchJobs = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
        setJobs(res.data);
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
        } else {
            fetchJobs();
        }
    }, [navigate]);

    const getAuthHeader = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/jobs`, formData, getAuthHeader());
            setShow(false);
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert('Failed to post job');
        }
    };

    const [loadingAI, setLoadingAI] = useState(false);

    const handleAutoFill = async () => {
        if (!formData.notificationLink) return alert("Please enter a Notification Link first!");

        setLoadingAI(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jobs/extract-info`, { url: formData.notificationLink });
            if (data) {
                setFormData({ ...formData, ...data });
                alert("Auto-filled successfully! Please review the details.");
            }
        } catch (error) {
            console.error(error);
            // Fallback for demo/testing if API fails
            if (window.confirm("AI Extraction failed (Check API Key). Use Demo Data instead?")) {
                setFormData({
                    ...formData,
                    title: "Demo Job Title (AI Failed)",
                    organization: "Demo Organization",
                    vacancies: "100",
                    description: "This is a demo description because the AI extraction failed. Please check your API key.",
                    type: "Private",
                    category: "Latest Jobs"
                });
            }
        } finally {
            setLoadingAI(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this job?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`, getAuthHeader());
                fetchJobs();
            } catch (err) {
                console.error(err);
                alert('Failed to delete job');
            }
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Admin Dashboard</h2>
            <Button variant="primary" className="mb-3" onClick={() => setShow(true)}>Post New Job</Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Organization</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job._id}>
                            <td>{job.title}</td>
                            <td>{job.organization}</td>
                            <td>{job.type}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(job._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={() => setShow(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Post New Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Notification PDF Link (Source URL)</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    name="notificationLink"
                                    value={formData.notificationLink}
                                    onChange={handleChange}
                                    placeholder="Paste official notification link here..."
                                />
                                <Button variant="warning" onClick={handleAutoFill} disabled={loadingAI}>
                                    {loadingAI ? 'Scanning...' : '✨ AI Auto-Fill'}
                                </Button>
                            </div>
                            <Form.Text className="text-muted">
                                Paste the link above and click "AI Auto-Fill" to automatically populate the form.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control name="title" value={formData.title} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Organization</Form.Label>
                            <Form.Control name="organization" value={formData.organization} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select name="type" value={formData.type} onChange={handleChange}>
                                <option value="Govt">Government</option>
                                <option value="Private">Private</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category (Section)</Form.Label>
                            <Form.Select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Latest Jobs">Latest Jobs</option>
                                <option value="Admit Card">Admit Card</option>
                                <option value="Results">Results</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Vacancies</Form.Label>
                            <Form.Control name="vacancies" value={formData.vacancies} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Qualification</Form.Label>
                            <Form.Control name="qualification" value={formData.qualification || ''} onChange={handleChange} placeholder="e.g. 10th Pass, B.Tech" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control name="salary" value={formData.salary || ''} onChange={handleChange} placeholder="e.g. ₹25,000 - ₹40,000" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Age Limit</Form.Label>
                            <Form.Control name="ageLimit" value={formData.ageLimit || ''} onChange={handleChange} placeholder="e.g. 18-30 Years" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Apply Online Link</Form.Label>
                            <Form.Control name="applyLink" value={formData.applyLink} onChange={handleChange} placeholder="https://..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Mark as Featured"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Post Job
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminDashboard;
