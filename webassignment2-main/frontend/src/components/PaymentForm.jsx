import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress, TextField, Grid } from '@mui/material';
import { toast } from 'react-toastify';

const PaymentForm = ({ paymentData, orderFunction, handleClose }) => {
    const [loading, setLoading] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleChange = (e) => {
        setCardDetails({
            ...cardDetails,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing delay
        setTimeout(async () => {
            // Mock success
            const paymentInfo = {
                id: "mock_payment_id_" + Date.now(),
                status: "succeeded",
            };

            try {
                await orderFunction(paymentInfo);
                setLoading(false);
                handleClose();
            } catch (error) {
                setLoading(false);
                toast.error("Order processing failed");
            }
        }, 2000);
    };

    return (
        <form onSubmit={submitHandler}>
            <Typography variant="h6" gutterBottom>Card Info (Demo Only)</Typography>

            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="0000 0000 0000 0000"
                    required
                />
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Expiry Date"
                            name="expiry"
                            value={cardDetails.expiry}
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="MM/YY"
                            required
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="CVC"
                            name="cvc"
                            value={cardDetails.cvc}
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="123"
                            required
                        />
                    </Box>
                </Grid>
            </Grid>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : `Pay - $${paymentData.amount.toFixed(2)}`}
            </Button>
        </form>
    );
};

export default PaymentForm;
