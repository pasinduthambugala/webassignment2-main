
import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, IconButton, Paper, Divider, Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import PaymentForm from '../components/PaymentForm';

const Cart = () => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [openPayment, setOpenPayment] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCart = async () => {
        try {
            const { data } = await axios.get('http://localhost:5002/api/cart', {
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
            await axios.delete(`http://localhost:5002/api/cart/removeItem/${id}`, {
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
            // Build order items compatible with backend order model
            const items = cartItems.map((item) => {
                const product = item.product && item.product._id ? item.product : { _id: item.product };
                const title = item.product && item.product.title ? item.product.title : `Book ${product._id}`;
                const image = item.product && item.product.thumbnail ? item.product.thumbnail : '';
                const price = item.price ?? (item.product && item.product.price) ?? 0;
                const quantity = item.quantity || 1;
                return {
                    book: product._id,
                    title,
                    quantity,
                    image,
                    price,
                    totalPrice: price * quantity,
                    available: true,
                };
            });

            await axios.post('http://localhost:5002/api/order',
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
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Your Shopping Cart</Typography>
            <Paper elevation={3}>
                <List>
                    {cartItems.map((item, index) => (
                        <div key={index}>
                            <ListItem secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.product && item.product._id ? item.product._id : item.product)}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <ListItemText
                                    primary={item.product && item.product.title ? item.product.title : `Book ID: ${item.product && item.product._id ? item.product._id : item.product}`}
                                    secondary={`Quantity: ${item.quantity} • $${(item.price ?? (item.product && item.product.price) ?? 0)}`}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                    {cartItems.length === 0 && (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography>Your cart is empty</Typography>
                        </Box>
                    )}
                </List>
                {cartItems.length > 0 && (
                    <Box sx={{ p: 3, textAlign: 'right', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
                        <Button variant="contained" color="primary" onClick={handleCheckout}>
                            Checkout
                        </Button>
                    </Box>
                )}
            </Paper>

            <Dialog open={openPayment} onClose={() => setOpenPayment(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Payment (Demo)</DialogTitle>
                <DialogContent>
                    <PaymentForm
                        paymentData={{
                            amount: totalPrice,
                            name: user.name,
                            email: user.email,
                            token: user.token
                        }}
                        orderFunction={processOrder}
                        handleClose={() => setOpenPayment(false)}
                    />
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Cart;
