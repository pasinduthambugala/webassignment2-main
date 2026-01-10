import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ChatBot from './components/ChatBot';
import Navbar from './components/Navbar';
import Home from './pages/BookList'; // Reusing BookList as Home
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';
import AboutUs from './pages/AboutUs';
import OrderHistory from './pages/OrderHistory';
import ProfilePage from './pages/ProfilePage';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1A237E', // Deep Indigo
        },
        secondary: {
            main: '#FF4081', // Pink Accent
        },
        background: {
            default: '#f4f6f8',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 500 },
        h6: { fontWeight: 500 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <Navbar />
                    <div className="App" style={{ minHeight: '90vh', paddingBottom: '50px' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/orders" element={<OrderHistory />} />
                            <Route path="/profile" element={<ProfilePage />} />
                        </Routes>

                        {/* Global ChatBot Widget */}
                        <ChatBot />
                        <ToastContainer position="bottom-right" theme="colored" />
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
