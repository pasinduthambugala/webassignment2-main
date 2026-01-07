import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        author: '',
        price: '',
        description: '',
        thumbnail: '',
        stock: ''
    });

    if (!user || !user.isAdmin) {
        navigate('/');
        return null;
    }

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5002/api/books', book, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            toast.success("Book added successfully!");
            setBook({ title: '', author: '', price: '', description: '', thumbnail: '', stock: '' });
        } catch (error) {
            toast.error("Failed to add book");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Paper elevation={5} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#1A237E', fontWeight: 'bold' }}>
                    Admin Dashboard
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                    Add a new book to the store
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField fullWidth label="Title" name="title" value={book.title} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Author" name="author" value={book.author} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Price" name="price" type="number" value={book.price} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Stock" name="stock" type="number" value={book.stock} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Image URL" name="thumbnail" value={book.thumbnail} onChange={handleChange} margin="normal" required />
                    <TextField fullWidth label="Description" name="description" multiline rows={4} value={book.description} onChange={handleChange} margin="normal" required />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, bgcolor: '#1A237E', py: 1.5 }}>
                        Add Book
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminDashboard;
