import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/?search=${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Search jobs by title or organization..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button type="submit" variant="primary">Search</Button>
            </InputGroup>
        </Form>
    );
};

export default Search;
