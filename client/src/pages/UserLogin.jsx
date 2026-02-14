import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
            localStorage.setItem('userToken', res.data.token);
            localStorage.setItem('userInfo', JSON.stringify({ username: res.data.username, role: res.data.role }));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '400px' }}>
                <Card.Header className="text-center bg-primary text-white">
                    <h3>User Login</h3>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">Login</Button>
                            <div className="text-center mt-2">
                                New here? <Link to="/register">Create an account</Link>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserLogin;
