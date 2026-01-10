import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Paper,
  Divider,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import API_URL from '../config';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import PaymentForm from '../components/PaymentForm';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [openPayment, setOpenPayment] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${user.token} ` }
      });
      if (data.success) {
        setCartItems(data.data);
        // Calculate total
        const total = data.data.reduce((acc, item) => {
          const price = item.price ?? (item.product && item.product.price) ?? 0;
          return acc + price * item.quantity;
        }, 0);
        setTotalPrice(total);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/cart/removeItem/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success("Removed");
      fetchCart();
    } catch (error) {
      toast.error("Failed to remove");
    }
  };

  const processOrder = async (paymentInfo) => {
    try {
      const items = cartItems.map((item) => {
        const product = item.product && item.product._id ? item.product : { _id: item.product };
        const title = item.product && item.product.title ? item.product.title : `Book ${product._id}`;
        const price = item.price ?? (item.product && item.product.price) ?? 0;
        const quantity = item.quantity || 1;
        return { book: product._id, title, quantity, price, totalPrice: price * quantity, available: true };
      });

      await axios.post(`${API_URL}/api/order`,
        {
          items,
          itemsPrice: totalPrice,
          paymentInfo
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Order Placed Successfully!");
      setCartItems([]);
      setOpenPayment(false);
    } catch (error) {
      toast.error("Checkout failed");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setOpenPayment(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 5,
        background: `
          linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
          url('https://cdn.pixabay.com/photo/2015/09/10/09/50/library-934285_1280.jpg')
          center/cover no-repeat
        `,
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          Your Shopping Cart
        </Typography>

        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.94)', // semi-transparent dark card
          }}
        >
          <List>
            {cartItems.map((item, index) => (
              <Box key={index}>
                <ListItem
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  <ListItemText
                    primary={item.product && item.product.title ? item.product.title : `Book ID: ${item.product}`}
                    secondary={`$${(item.price ?? (item.product && item.product.price) ?? 0).toFixed(2)}`}
                    primaryTypographyProps={{ fontWeight: 'bold', color: '#fff' }}
                    secondaryTypographyProps={{ color: '#fff' }}
                  />

                  {/* Quantity Controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => updateQuantity(item, -1)} sx={{ color: '#fff' }}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1, minWidth: 20, textAlign: 'center', color: '#fff' }}>
                      {item.quantity}
                    </Typography>
                    <IconButton onClick={() => updateQuantity(item, 1)} sx={{ color: '#fff' }}>
                      <AddIcon />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        removeFromCart(item.product && item.product._id ? item.product._id : item.product)
                      }
                      sx={{ color: 'error.main', ml: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
              </Box>
            ))}

            {cartItems.length === 0 && (
              <Box sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  Your cart is empty
                </Typography>
              </Box>
            )}
          </List>

          {cartItems.length > 0 && (
            <Box
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#fff' }}>
                  Total Items: {totalItems}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff' }}>
                  Total Price: ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Box>
          )}
        </Paper>

        {/* Payment Dialog */}
        <Dialog open={openPayment} onClose={() => setOpenPayment(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: '#000' }}>Payment (Demo)</DialogTitle>
          <DialogContent>
            <PaymentForm
              paymentData={{
                amount: totalPrice,
                name: user.name,
                email: user.email,
                token: user.token,
              }}
              orderFunction={processOrder}
              handleClose={() => setOpenPayment(false)}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Cart;
