import React from 'react';
import {
  Box,
  Typography,
  Grid,
  CardContent,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeField, addField } from '../../../store/actions';

const TransactionDataFields = ({ transactionFields, customField, setCustomField }) => {
  const dispatch = useDispatch();

  return (
    <CardContent>
      <Typography variant="h6" gutterBottom>Transaction Data Fields</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Standard Fields</Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1, 
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {transactionFields.map((field, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={<Switch checked={field.required} onChange={() => {}} />}
                  label={<Typography variant="body1" sx={{ color: '#555' }}>{field.name}</Typography>}
                />
                <Button variant="outlined" color="error" onClick={() => dispatch(removeField(index))}>
                  <Delete />
                </Button>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Add Custom Field</Typography>
          <TextField
            label="Field Name"
            value={customField.name}
            onChange={(e) => setCustomField({ ...customField, name: e.target.value })}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Field Type</InputLabel>
            <Select
              value={customField.type}
              onChange={(e) => setCustomField({ ...customField, type: e.target.value })}
              label="Field Type"
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={customField.required}
                onChange={(e) => setCustomField({ ...customField, required: e.target.checked })}
              />
            }
            label={<Typography variant="body1" sx={{ color: '#555' }}>Required</Typography>}
          />
          <TextField
            label="Description"
            value={customField.description}
            onChange={(e) => setCustomField({ ...customField, description: e.target.value })}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={() => {
            if (customField.name) {
              dispatch(addField(customField));
              setCustomField({ name: '', type: 'string', required: false, description: '' });
            }
          }}>
            Add Field
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TransactionDataFields;
