import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

const NewsTicker = ({ newsItems = ["Latest Jobs Updated!", "Check Admit Cards Now", "New Results Declared"] }) => {
    return (
        <div className="bg-dark text-white py-2 overflow-hidden position-relative">
            <Container fluid className="d-flex align-items-center">
                <span className="badge bg-danger me-3 px-3 py-2 rounded-pill shadow-sm" style={{ zIndex: 10 }}>BREAKING</span>
                <motion.div
                    className="d-flex whitespace-nowrap"
                    animate={{ x: [1000, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                    {newsItems.map((item, index) => (
                        <span key={index} className="mx-4 fw-bold text-uppercase d-flex align-items-center">
                            <span className="text-warning me-2">●</span> {item}
                        </span>
                    ))}
                </motion.div>
            </Container>
        </div>
    );
};

export default NewsTicker;
