import React, { useState, useContext } from 'react';
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Alert
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage:
                    'url(https://cdn.pixabay.com/photo/2023/07/27/21/04/ai-generated-8154058_1280.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}
        >
            {/* Dark overlay for readability */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.45)'
                }}
            />

            {/* LOGIN FORM */}
            <Container maxWidth="xs" sx={{ zIndex: 1 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 3,
                            fontWeight: 'bold',
                            color: '#fff',
                            textAlign: 'center'
                        }}
                    >
                        Welcome Back
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            required
                            label="Email Address"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{ style: { color: '#eee' } }}
                            sx={{
                                input: { color: '#fff' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(255,255,255,0.5)'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff'
                                    }
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{ style: { color: '#eee' } }}
                            sx={{
                                input: { color: '#fff' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(255,255,255,0.5)'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff'
                                    }
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            sx={{
                                mt: 3,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                borderRadius: 3,
                                background:
                                    'linear-gradient(135deg, #E6E6FA, #E6E6FA)',
                                color: '#470047'
                            }}
                        >
                            Sign In
                        </Button>

                        <Typography
                            sx={{
                                mt: 2,
                                textAlign: 'center',
                                color: '#fff'
                            }}
                        >
                            Don’t have an account?{' '}
                            <Link
                                to="/register"
                                style={{
                                    color: '#E6E6FA',
                                    fontWeight: 500
                                }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
