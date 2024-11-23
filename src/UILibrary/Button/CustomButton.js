import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import './CustomButton.styles.css';

const CustomButton = ({ children, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        {...props}
        className="custom-button"
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default CustomButton;
