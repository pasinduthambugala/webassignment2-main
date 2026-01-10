import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

const OrderHistory = () => {
  const orders = [
    { id: 'ORD001', date: '2026-01-01', total: '$45.00', status: 'Delivered' },
    { id: 'ORD002', date: '2026-01-05', total: '$30.00', status: 'Processing' },
    { id: 'ORD003', date: '2026-01-08', total: '$60.00', status: 'Shipped' },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Processing':
        return 'warning';
      case 'Shipped':
        return 'secondary'; // purple
      default:
        return 'default';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 10,
        px: 2,
        background: `url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80') center/cover no-repeat`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.68)' // dark overlay for readability
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Page Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '5rem', md: '6rem' },
            background: 'linear-gradient(90deg, #fefefeff, #ffffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}
        >
          Order History
        </Typography>

        {/* Glassy Card */}
        <Paper
          elevation={12}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: 'rgba(0, 0, 0, 0.86)',
            backdropFilter: 'blur(16px)',
            overflowX: 'auto'
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                  Order ID
                </TableCell>
                <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                  Date
                </TableCell>
                <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                  Total
                </TableCell>
                <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 500 }}>
                    {order.id}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#ffffff' }}>
                    {order.date}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 800 }}>
                    {order.total}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={order.status}
                      color={statusColor(order.status)}
                      sx={{ fontWeight: 'bold', px: 2 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
};

export default OrderHistory;
