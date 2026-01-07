import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1A237E 30%, #283593 90%)', boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" component={Link} to="/">
                    <MenuBookIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1, ml: 1 }}>
                    Lavender Bookshop
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>

                    {user && (
                        <>
                            <IconButton color="inherit" component={Link} to="/cart">
                                <Badge badgeContent={0} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>

                            {user.isAdmin && (
                                <Button color="inherit" component={Link} to="/admin" sx={{ border: '1px solid rgba(255,255,255,0.5)', borderRadius: 2 }}>
                                    Admin Dashboard
                                </Button>
                            )}

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: 20 }}>
                                <AccountCircleIcon />
                                <Typography variant="subtitle2">{user.name}</Typography>
                            </Box>

                            <IconButton color="inherit" onClick={handleLogout} title="Logout">
                                <LogoutIcon />
                            </IconButton>
                        </>
                    )}

                    {!user && (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button variant="contained" color="secondary" component={Link} to="/register" sx={{ borderRadius: 20 }}>
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
