import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 8,
        px: 2,
        background: `url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1470&q=80') center/cover no-repeat`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.67)' // soft dark overlay
        },
        color: '#fff'
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Page Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '2rem', md: '6rem' },
            background: 'linear-gradient(90deg, #ffffffff, #ffffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 15px rgba(11, 2, 2, 0.2)'
          }}
        >
          About Us
        </Typography>

        {/* Main Card */}
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(10px)',
            textAlign: 'left'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold', // make bold
              mb: 3,
              color: '#FBBF24', // warm golden accent
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            Welcome to Lavender Bookshop
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: '1.1rem', mb: 2, lineHeight: 1.8, color: '#ffffff', fontWeight: 'bold' }}
          >
            At Lavender Bookshop, we are passionate about creating memorable reading experiences. 
            From timeless classics to contemporary bestsellers, we carefully curate a collection 
            that caters to every reader's taste.
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: '1.1rem', mb: 2, lineHeight: 1.8, color: '#ffffff', fontWeight: 'bold' }}
          >
            Our mission is to ignite a love for reading and make books accessible to everyone. 
            Whether you seek knowledge, inspiration, or adventure, our shelves have something for you.
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#ffffff', fontWeight: 'bold' }}
          >
            Explore our latest arrivals, author recommendations, and exclusive events. 
            Join our community of book lovers and make reading a daily delight!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUs;
