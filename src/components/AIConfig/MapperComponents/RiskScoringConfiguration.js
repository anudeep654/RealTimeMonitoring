import React, { useState } from 'react';
import {
  CardContent,
  Typography,
  Box,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Card,
  Button,
} from '@mui/material';

const RiskScoringConfiguration = () => {
  const [transactionAmount, setTransactionAmount] = useState(10000);
  const [transactionType, setTransactionType] = useState('');
  const [transactionVelocity, setTransactionVelocity] = useState('');
  const [velocityWeight, setVelocityWeight] = useState(1);

  const handleAmountChange = (event, newValue) => {
    setTransactionAmount(newValue);
  };

  const handleTypeChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleVelocityChange = (event) => {
    setTransactionVelocity(event.target.value);
  };

  const handleVelocityWeightChange = (event) => {
    setVelocityWeight(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      transactionAmount,
      transactionType,
      transactionVelocity,
      velocityWeight,
    });
  };

  return (
    <CardContent>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Risk Scoring Configuration
      </Typography>

      <form onSubmit={handleSubmit}>
        <Card sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>Transaction-Based Risk Factors</Typography>

          {/* Transaction Amount Slider */}
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Transaction Amount Threshold</Typography>
            <Slider
              value={transactionAmount}
              onChange={handleAmountChange}
              aria-labelledby="transaction-amount-slider"
              valueLabelDisplay="auto"
              step={1000}
              min={0}
              max={100000}
            />
            <Typography variant="body2">Flag transactions above ${transactionAmount}</Typography>
          </Box>

          {/* Transaction Type Dropdown */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
            <Select
              labelId="transaction-type-label"
              value={transactionType}
              onChange={handleTypeChange}
            >
              <MenuItem value="Debit">Debit (Low Risk)</MenuItem>
              <MenuItem value="Credit">Credit (Medium Risk)</MenuItem>
              <MenuItem value="International Transfer">International Transfer (High Risk)</MenuItem>
              <MenuItem value="Wire Transfer">Wire Transfer (High Risk)</MenuItem>
            </Select>
          </FormControl>

          {/* Transaction Velocity Configuration */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Transaction Velocity"
                value={transactionVelocity}
                onChange={handleVelocityChange}
                fullWidth
                placeholder="e.g., More than 5 transactions in 1 minute"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Velocity Weight"
                type="number"
                value={velocityWeight}
                onChange={handleVelocityWeightChange}
                fullWidth
                placeholder="Weight for rapid transactions"
              />
            </Grid>
          </Grid>
        </Card>

        <Button variant="contained" color="primary" type="submit">
          Save Configuration
        </Button>
      </form>
    </CardContent>
  );
};

export default RiskScoringConfiguration;
