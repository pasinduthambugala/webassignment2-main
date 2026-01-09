import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  CircularProgress,
  InputAdornment,
  IconButton,
  Rating,
  Fade,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5002/api/books');
        if (res.data?.success && Array.isArray(res.data.data)) {
          setBooks(res.data.data);
        } else {
          setBooks([]);
          toast.error('No books available');
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
        setBooks([]);
        toast.error('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Add book to cart
  const addToCart = async (bookId, bookTitle) => {
    if (!user?.token) {
      toast.error('Please login to add books to cart');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5002/api/cart/addCart',
        { bookId, quantity: 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success(`"${bookTitle}" added to cart!`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  // Filter books by search
  const filteredBooks = books.filter(
    (book) =>
      (book.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (book.author || '').toLowerCase().includes(search.toLowerCase()) ||
      (book.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
     <Box
  sx={{
    minHeight: '100vh',
    py: 6,
    
    /* Book image background */
    background: `url('https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg') center/cover no-repeat`,
    
    /* Optional subtle glossy glass overlay */
    position: 'relative',
    overflow: 'hidden',

    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.78)', // dark overlay for readability
      pointerEvents: 'none',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      pointerEvents: 'none',
    },
  }}
>

     <Container maxWidth="xl">
  {/* Header Section */}
  <Fade in timeout={800}>
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Typography
        variant="h2"
        sx={{
          position: 'relative',
          fontWeight: 800,
          color: '#ffffffff',
          mb: 2,
          background: 'linear-gradient( #ffffffff 30%, #ffffffff 90%)', 
          WebkitBackgroundClip: 'text',
        }}
      >
        📚 Discover Amazing Books
      </Typography>
      <Typography
        variant="h6"
        sx={{
          position: 'relative',
          color: 'rgba(255, 255, 255, 1)', // soft cream/golden
          mb: 4,
          fontWeight: 400,
        }}
      >
  

              Explore our curated collection of {books.length} books
            </Typography>

            {/* Search Bar */}
            <Paper
              elevation={0}
              sx={{
                maxWidth: 600,
                mx: 'auto',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by title, author, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 28 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    color: 'white',
                    fontSize: '1.1rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&::placeholder': {
                      color: 'rgba(255,255,255,0.7)',
                    },
                  },
                }}
                sx={{
                  '& input': {
                    py: 2,
                  },
                  '& input::placeholder': {
                    color: 'rgba(255,255,255,0.7)',
                    opacity: 1,
                  },
                }}
              />
            </Paper>
          </Box>
        </Fade>

        {/* Books Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress sx={{ color: 'white' }} size={60} />
          </Box>
        ) : filteredBooks.length > 0 ? (
          <Grid container spacing={3}>
            {filteredBooks.map((book, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={book._id}>
                <Fade in timeout={300 + index * 50}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 4,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        background: 'rgba(255, 255, 255, 0.15)',
                      },
                    }}
                  >
                    {/* Book Image */}
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '80%', // Reduced from 140% for better grid layout
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={book.thumbnail}
                        alt={book.title}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                      {/* Stock Badge */}
                      <Chip
                        icon={<InventoryIcon sx={{ fontSize: 14 }} />}
                        label={book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: book.stock > 0
                            ? 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)'
                            : 'linear-gradient(45deg, #f44336 30%, #e57373 90%)',
                          color: 'white',
                          fontWeight: 600,
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          '& .MuiChip-icon': { color: 'white' },
                        }}
                      />
                    </Box>

                    {/* Book Details */}
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                      }}
                    >
                      {/* Category */}
                      <Chip
                        icon={<LocalOfferIcon sx={{ fontSize: 14 }} />}
                        label={book.category || 'General'}
                        size="small"
                        sx={{
                          alignSelf: 'flex-start',
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          color: 'white',
                          fontWeight: 600,
                          border: '1px solid rgba(255,255,255,0.3)',
                          '& .MuiChip-icon': { color: 'white' },
                        }}
                      />

                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: 'white',
                          fontSize: '1.1rem',
                          lineHeight: 1.3,
                          minHeight: '2.6em',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {book.title}
                      </Typography>

                      {/* Author */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.8)',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <MenuBookIcon sx={{ fontSize: 16 }} />
                        {book.author}
                      </Typography>

                      {/* Rating */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating
                          value={book.rating || 0}
                          precision={0.5}
                          readOnly
                          size="small"
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: '#FFD700',
                            },
                            '& .MuiRating-iconEmpty': {
                              color: 'rgba(255,255,255,0.3)',
                            },
                          }}
                        />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          ({book.rating || 0})
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.85rem',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '2.5em',
                        }}
                      >
                        {book.description}
                      </Typography>

                      {/* Price and Cart Button */}
                      <Box
                        sx={{
                          mt: 'auto',
                          pt: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 2,
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          ${book.price.toFixed(2)}
                        </Typography>

                        <Button
                          variant="contained"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => addToCart(book._id, book.title)}
                          disabled={!user?.token || book.stock === 0}
                          sx={{
                            flex: 1,
                            background: user?.token && book.stock > 0
                              ? 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)'
                              : 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            fontWeight: 700,
                            textTransform: 'none',
                            py: 1,
                            borderRadius: 2,
                            boxShadow: user?.token && book.stock > 0
                              ? '0 4px 12px rgba(76, 175, 80, 0.4)'
                              : 'none',
                            border: '1px solid rgba(255,255,255,0.3)',
                            '&:hover': {
                              background: user?.token && book.stock > 0
                                ? 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)'
                                : 'rgba(255, 255, 255, 0.2)',
                              transform: user?.token && book.stock > 0 ? 'scale(1.05)' : 'none',
                              boxShadow: user?.token && book.stock > 0
                                ? '0 6px 16px rgba(76, 175, 80, 0.5)'
                                : 'none',
                            },
                            '&:disabled': {
                              color: 'rgba(255,255,255,0.5)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {!user?.token ? 'Login to Buy' : book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 4,
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
              📖 No books found
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BookList;
