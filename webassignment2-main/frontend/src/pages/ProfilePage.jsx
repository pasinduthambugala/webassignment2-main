import React, { useContext, useState } from 'react';
import { Box, Container, Typography, Paper, Avatar, TextField, Divider } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    phone: user?.phone || ''
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        px: 2,
        background: `
          linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
          url('https://images.pexels.com/photos/22717411/pexels-photo-22717411.jpeg')
          center/cover no-repeat
        `,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: '#fff',
      }}
    >
      <Container maxWidth="sm">
        {/* Page Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '2rem', md: '3rem' },
            color: '#fff',
            textShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        >
          My Profile
        </Typography>

        {/* Glassy Card */}
        <Paper
          elevation={12}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            background: 'rgba(0,0,0,0.7)', // dark glass effect
            backdropFilter: 'blur(12px)',
            textAlign: 'center',
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            src={user?.profilePhoto || 'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbnxlbnwwfHwwfHx8MA%3D%3D'}
            alt={user?.name}
            sx={{
              width: 130,
              height: 130,
              mx: 'auto',
              mb: 4,
              border: '3px solid #ffffffff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              cursor: 'pointer'
            }}
          />

          <Divider sx={{ background: 'rgba(255,255,255,0.2)', mb: 4 }} />

          {/* Editable Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left' }}>
            <TextField
              label="Full Name"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              variant="filled"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontWeight: 'bold',
                  color: '#fff',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 2,
                  px: 2,
                  py: 1.2
                }
              }}
              InputLabelProps={{
                sx: { fontWeight: 'bold', color: '#fff' }
              }}
            />

            <TextField
              label="Email Address"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              variant="filled"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontWeight: 'bold',
                  color: '#fff',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 2,
                  px: 2,
                  py: 1.2
                }
              }}
              InputLabelProps={{
                sx: { fontWeight: 'bold', color: '#fff' }
              }}
            />

            <TextField
              label="Address"
              value={profile.address}
              onChange={(e) => handleChange('address', e.target.value)}
              variant="filled"
              fullWidth
              multiline
              minRows={3}
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontWeight: 'bold',
                  color: '#fff',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 2,
                  px: 2,
                  py: 1.2
                }
              }}
              InputLabelProps={{
                sx: { fontWeight: 'bold', color: '#fff' }
              }}
            />

            <TextField
              label="Phone Number"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              variant="filled"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontWeight: 'bold',
                  color: '#fff',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 2,
                  px: 2,
                  py: 1.2
                }
              }}
              InputLabelProps={{
                sx: { fontWeight: 'bold', color: '#fff' }
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
