import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // common nav button style
  const navButtonStyle = (path) => ({
    color: location.pathname === path ? '#1D4ED8' : '#1F2937', // dark color for buttons
    fontWeight: 500,
    textTransform: 'none',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 6,
      left: '25%',
      width: location.pathname === path ? '50%' : '0%',
      height: '2px',
      background: '#1D4ED8', // dark blue underline for active
      transition: '0.3s'
    },
    '&:hover::after': {
      width: '50%'
    }
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: '#E6E6FA', // light navbar
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
      }}
    >
      <Toolbar>
        {/* LOGO */}
        <IconButton
          edge="start"
          component={Link}
          to="/"
          sx={{ mr: 1, color: '#1F2937' }}
        >
          <MenuBookIcon sx={{ fontSize: 32 }} />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: 1.3,
            color: '#1F2937'
          }}
        >
          Lavender Bookshop
        </Typography>

        {/* NAVIGATION */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button component={Link} to="/" sx={navButtonStyle('/')}>
            Home
          </Button>

          <Button component={Link} to="/about" sx={navButtonStyle('/about')}>
            About Us
          </Button>

          {user && (
            <>
              <Button component={Link} to="/orders" sx={navButtonStyle('/orders')}>
                Order History
              </Button>

              <Button component={Link} to="/profile" sx={navButtonStyle('/profile')}>
                Profile
              </Button>

              <IconButton
                component={Link}
                to="/cart"
                sx={{
                  color: '#1F2937',
                  '&:hover': { color: '#1D4ED8' }
                }}
              >
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {user.isAdmin && (
                <Button
                  component={Link}
                  to="/admin"
                  sx={{
                    ml: 1,
                    px: 2.5,
                    borderRadius: 3,
                    fontWeight: 'bold',
                    color: '#1F2937',
                    border: '1px solid rgba(0,0,0,0.15)',
                    '&:hover': {
                      borderColor: '#1D4ED8',
                      color: '#1D4ED8'
                    }
                  }}
                >
                  Admin
                </Button>
              )}

              {/* USER INFO */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.7,
                  ml: 1,
                  borderRadius: 5,
                  background: 'rgba(0,0,0,0.05)',
                  color: '#1F2937'
                }}
              >
                <AccountCircleIcon />
                <Typography variant="subtitle2">{user.name}</Typography>
              </Box>

              <IconButton
                onClick={handleLogout}
                title="Logout"
                sx={{
                  ml: 1,
                  color: '#1F2937',
                  '&:hover': { color: '#EF4444' }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </>
          )}

          {!user && (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: '#1F2937',
                  textTransform: 'none'
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                sx={{
                  ml: 1,
                  px: 3,
                  borderRadius: 4,
                  fontWeight: 'bold',
                  background: '#374151', // dark gray button
                  color: '#F9FAFB', // light text
                  '&:hover': {
                    background: '#1F2937'
                  }
                }}
              >
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
