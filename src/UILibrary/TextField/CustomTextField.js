import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import './CustomTextField.styles.css';

const CustomTextField = ({ icon, autoFocus = false, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{ marginBottom: '16px' }}
    >
      <TextField
        autoFocus={autoFocus}
        {...props}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(26, 35, 126, 0.2)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(26, 35, 126, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1a237e',
            },
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }
        }}
        InputLabelProps={{
          sx: {
            color: 'rgba(26, 35, 126, 0.7)',
            '&.Mui-focused': {
              color: '#1a237e',
            }
          }
        }}
      />
    </motion.div>
  );
};

export default CustomTextField;
