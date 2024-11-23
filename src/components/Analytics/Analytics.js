import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const Analytics = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Box>
        {/* Analytics content will go here */}
        <Typography>Coming Soon: Advanced Analytics</Typography>
      </Box>
    </Paper>
  );
};

export default Analytics; 