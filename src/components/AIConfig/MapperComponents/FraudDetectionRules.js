import React, { useState } from 'react';
import {
  CardContent,
  Typography,
  Box,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  TextareaAutosize,
  Card,
} from '@mui/material';

const FraudDetectionRules = () => {
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [ruleType, setRuleType] = useState('');
  const [severityLevel, setSeverityLevel] = useState('');
  const [amountThreshold, setAmountThreshold] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [validityStart, setValidityStart] = useState('');
  const [validityEnd, setValidityEnd] = useState('');
  const [sampleData, setSampleData] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      ruleName,
      ruleDescription,
      ruleType,
      severityLevel,
      amountThreshold,
      currency,
      validityStart,
      validityEnd,
      sampleData,
    });
  };

  return (
    <CardContent>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', fontFamily: 'Arial, sans-serif' }}>
        Fraud Detection Rules
      </Typography>

      <form onSubmit={handleSubmit}>
        <Card sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>Rule Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Rule Name"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                fullWidth
                placeholder="Enter rule name (e.g., High-Amount Transactions)"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="rule-type-label">Rule Type</InputLabel>
                <Select
                  labelId="rule-type-label"
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value)}
                  sx={{ '& .MuiSelect-select': { padding: '10px', height: '56px' } }}
                >
                  <MenuItem value="Amount-Based">Amount-Based</MenuItem>
                  <MenuItem value="Location-Based">Location-Based</MenuItem>
                  <MenuItem value="Frequency-Based">Frequency-Based</MenuItem>
                  <MenuItem value="Device-Based">Device-Based</MenuItem>
                  <MenuItem value="Custom Rule">Custom Rule</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Severity Level</InputLabel>
                <Select
                  value={severityLevel}
                  onChange={(e) => setSeverityLevel(e.target.value)}
                  sx={{ '& .MuiSelect-select': { padding: '10px', height: '56px' } }}
                >
                  <MenuItem value="Low Risk">Low Risk</MenuItem>
                  <MenuItem value="Medium Risk">Medium Risk</MenuItem>
                  <MenuItem value="High Risk">High Risk</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Amount Threshold"
                value={amountThreshold}
                onChange={(e) => setAmountThreshold(e.target.value)}
                fullWidth
                placeholder="e.g., 10000"
                type="number"
                
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                fullWidth
                placeholder="e.g., USD"
                
              />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>Advanced Settings</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Rule Validity Start"
                type="date"
                value={validityStart}
                onChange={(e) => setValidityStart(e.target.value)}
                fullWidth
                
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Rule Validity End"
                type="date"
                value={validityEnd}
                onChange={(e) => setValidityEnd(e.target.value)}
                fullWidth
                
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>Rule Testing and Preview</Typography>
          <TextField
            label="Sample Transaction Data"
            value={sampleData}
            onChange={(e) => setSampleData(e.target.value)}
            fullWidth
            multiline
            rows={4}
            placeholder='{ "amount": 12000, "location": "Singapore", "device_id": "device123" }'
            sx={{ mb: 2, '& .MuiInputBase-root': { padding: '10px', height: '100px' } }}
          />
        </Card>

        <Button variant="contained" color="primary" type="submit">
          Save Rules
        </Button>
      </form>
    </CardContent>
  );
};

export default FraudDetectionRules;
