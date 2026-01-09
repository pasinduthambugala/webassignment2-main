import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, Paper, Typography, TextField, IconButton, Fab, Zoom, Avatar, Card, CardContent, Chip, Divider, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import API_URL from '../config';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! 👋 Welcome to our bookstore! I can help you find books, check availability, and get prices. What are you looking for today?", sender: 'bot' }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { user } = useContext(AuthContext);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    // Add to cart function
    const addToCart = async (bookId, bookTitle) => {
        if (!user?.token) {
            toast.error('Please login to add books to cart');
            return;
        }

        try {
            await axios.post(
                `${API_URL}/api/cart/addCart`,
                { bookId, quantity: 1 },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            toast.success(`"${bookTitle}" added to cart!`);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    // Parse book data from response text - enhanced to include ID
    const parseBookData = (text, fullResponse) => {
        const books = [];
        const lines = text.split('\n');

        // Try to extract book IDs from the response if available
        // This is a simple approach - in production, the backend should return structured data
        for (let line of lines) {
            // Match patterns like: 1. "Title" by Author - $Price
            const match = line.match(/^\d+\.\s*["'](.+?)["']\s+by\s+(.+?)\s+-\s+\$(\d+\.?\d*)/);
            if (match) {
                books.push({
                    title: match[1],
                    author: match[2],
                    price: match[3],
                    // We'll need to fetch the actual ID from the database
                    // For now, we'll use title as identifier
                    searchKey: match[1]
                });
            }
        }

        return books;
    };

    // Check if message contains book list
    const hasBookList = (text) => {
        return text.includes('$') && (text.match(/\d+\.\s*["']/g) || []).length >= 2;
    };

    // Render book card
    const renderBookCard = (book, index) => {
        // Function to get book ID by title
        const handleAddToCart = async () => {
            try {
                // First, fetch the book by title to get its ID
                const response = await axios.get(`${API_URL}/api/books`);
                if (response.data?.success) {
                    const foundBook = response.data.data.find(b =>
                        b.title.toLowerCase() === book.title.toLowerCase()
                    );
                    if (foundBook) {
                        await addToCart(foundBook._id, foundBook.title);
                    } else {
                        toast.error('Book not found');
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to add to cart');
            }
        };

        return (
            <Card
                key={index}
                sx={{
                    mb: 1.5,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 16px rgba(26, 35, 126, 0.2)',
                        border: '1px solid rgba(26, 35, 126, 0.3)',
                    }
                }}
            >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <Avatar sx={{
                            bgcolor: 'rgba(26, 35, 126, 0.1)',
                            color: '#1A237E',
                            width: 40,
                            height: 40
                        }}>
                            <MenuBookIcon fontSize="small" />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    color: '#1A237E',
                                    mb: 0.5,
                                    fontSize: '0.95rem'
                                }}
                            >
                                {book.title}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    display: 'block',
                                    mb: 1
                                }}
                            >
                                by {book.author}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                                <Chip
                                    icon={<AttachMoneyIcon sx={{ fontSize: 16 }} />}
                                    label={`$${book.price}`}
                                    size="small"
                                    sx={{
                                        background: 'linear-gradient(45deg, #1A237E 30%, #534bae 90%)',
                                        color: 'white',
                                        fontWeight: 600,
                                        height: 24,
                                        '& .MuiChip-icon': { color: 'white' }
                                    }}
                                />
                                <Button
                                    size="small"
                                    variant="contained"
                                    startIcon={<ShoppingCartIcon sx={{ fontSize: 14 }} />}
                                    onClick={handleAddToCart}
                                    disabled={!user?.token}
                                    sx={{
                                        height: 24,
                                        fontSize: '0.7rem',
                                        px: 1.5,
                                        py: 0,
                                        background: user?.token
                                            ? 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)'
                                            : 'rgba(0, 0, 0, 0.12)',
                                        color: 'white',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        boxShadow: user?.token ? '0 2px 8px rgba(76, 175, 80, 0.3)' : 'none',
                                        '&:hover': {
                                            background: user?.token
                                                ? 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)'
                                                : 'rgba(0, 0, 0, 0.12)',
                                            transform: user?.token ? 'scale(1.05)' : 'none',
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {user?.token ? 'Add to Cart' : 'Login'}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        );
    };

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        const userMsg = { id: Date.now(), text: newMessage, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setNewMessage('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/chat`, { message: userMsg.text });
            const botReply = {
                id: Date.now() + 1,
                text: response.data.response || response.data.reply || "I received your message!",
                sender: 'bot'
            };
            setMessages(prev => [...prev, botReply]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMsg = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting right now. Please try again.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Floating Action Button */}
            <Zoom in={!isOpen}>
                <Fab
                    color="primary"
                    aria-label="chat"
                    onClick={toggleChat}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                        background: 'linear-gradient(135deg, #1A237E 0%, #534bae 100%)',
                        boxShadow: '0 8px 24px rgba(26, 35, 126, .4)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #0d1642 0%, #3d3582 100%)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 12px 32px rgba(26, 35, 126, .5)',
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    <ChatIcon />
                </Fab>
            </Zoom>

            {/* Chat Window */}
            <Zoom in={isOpen}>
                <Paper
                    elevation={0}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        width: 400,
                        height: 600,
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                    }}
                >
                    {/* Header */}
                    <Box sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, #1A237E 0%, #534bae 100%)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(255, 255, 255, 0.3)'
                            }}>
                                <SmartToyIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                                    AI Book Assistant
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Online • Ready to help
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton
                            onClick={toggleChat}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'rotate(90deg)',
                                    transition: 'all 0.3s ease'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Messages Area */}
                    <Box sx={{
                        flexGrow: 1,
                        p: 2.5,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        background: 'linear-gradient(180deg, rgba(245,245,250,0.5) 0%, rgba(235,235,245,0.5) 100%)',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'rgba(0,0,0,0.05)',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(26, 35, 126, 0.3)',
                            borderRadius: '10px',
                            '&:hover': {
                                background: 'rgba(26, 35, 126, 0.5)',
                            }
                        }
                    }}>
                        {messages.map((msg) => {
                            const books = msg.sender === 'bot' ? parseBookData(msg.text) : [];
                            const showBookCards = books.length > 0 && hasBookList(msg.text);
                            const textWithoutBooks = showBookCards
                                ? msg.text.split('\n').filter(line => !line.match(/^\d+\.\s*["']/)).join('\n').trim()
                                : msg.text;

                            return (
                                <Box
                                    key={msg.id}
                                    sx={{
                                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                    }}
                                >
                                    {msg.sender === 'user' ? (
                                        <Box sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            background: 'linear-gradient(135deg, #1A237E 0%, #534bae 100%)',
                                            color: 'white',
                                            boxShadow: '0 4px 12px rgba(26, 35, 126, 0.3)',
                                            borderBottomRightRadius: 4,
                                        }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                    fontWeight: 500
                                                }}
                                            >
                                                {msg.text}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box>
                                            {textWithoutBooks && (
                                                <Box sx={{
                                                    p: 2,
                                                    borderRadius: 3,
                                                    background: 'rgba(255, 255, 255, 0.9)',
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(26, 35, 126, 0.1)',
                                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                                                    borderBottomLeftRadius: 4,
                                                    mb: showBookCards ? 1.5 : 0
                                                }}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word',
                                                            color: 'text.primary',
                                                            lineHeight: 1.6
                                                        }}
                                                    >
                                                        {textWithoutBooks}
                                                    </Typography>
                                                </Box>
                                            )}
                                            {showBookCards && (
                                                <Box sx={{ mt: textWithoutBooks ? 0 : 0 }}>
                                                    {books.map((book, index) => renderBookCard(book, index))}
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            );
                        })}
                        {loading && (
                            <Box sx={{
                                alignSelf: 'flex-start',
                                p: 2,
                                borderRadius: 3,
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(26, 35, 126, 0.1)',
                            }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                    AI is thinking...
                                </Typography>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{
                        p: 2.5,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        gap: 1.5,
                        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)'
                    }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Ask about books..."
                            variant="outlined"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    '& fieldset': {
                                        borderColor: 'rgba(26, 35, 126, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(26, 35, 126, 0.4)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1A237E',
                                        borderWidth: 2,
                                    },
                                }
                            }}
                        />
                        <IconButton
                            color="primary"
                            onClick={handleSend}
                            disabled={!newMessage.trim()}
                            sx={{
                                background: 'linear-gradient(135deg, #1A237E 0%, #534bae 100%)',
                                color: 'white',
                                borderRadius: 3,
                                px: 2,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #0d1642 0%, #3d3582 100%)',
                                    transform: 'scale(1.05)',
                                },
                                '&:disabled': {
                                    background: 'rgba(0, 0, 0, 0.12)',
                                    color: 'rgba(0, 0, 0, 0.26)',
                                },
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(26, 35, 126, 0.3)',
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            </Zoom>
        </>
    );
};

export default ChatBot;
