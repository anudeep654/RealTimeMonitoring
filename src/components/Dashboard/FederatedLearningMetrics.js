import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { NetworkCheck, Cloud, Storage, Speed } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';

const ModelUpdateIndicator = ({ bankId, status, accuracy }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Box sx={{ 
      p: 2, 
      border: '1px solid rgba(26,35,126,0.2)',
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      bgcolor: status === 'updating' ? 'rgba(25,118,210,0.1)' : 'transparent'
    }}>
      <CircularProgress 
        variant="determinate" 
        value={accuracy} 
        size={40}
        sx={{ color: '#1976d2' }}
      />
      <Box>
        <Typography variant="subtitle2">Bank {bankId}</Typography>
        <Typography variant="caption" color="textSecondary">
          {status === 'updating' ? 'Model Update in Progress' : 'Last Update: 2m ago'}
        </Typography>
      </Box>
    </Box>
  </motion.div>
);

const FederatedLearningMetrics = () => {
  const [globalAccuracy, setGlobalAccuracy] = useState(95.8);
  const [participatingBanks, setParticipatingBanks] = useState(8);
  
  const modelPerformanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Global Model Accuracy',
        data: [92, 93.5, 94.2, 94.8, 95.3, 95.8],
        borderColor: '#1976d2',
        tension: 0.4,
      },
      {
        label: 'Average Local Model Accuracy',
        data: [90, 91.2, 92.1, 92.8, 93.5, 94.1],
        borderColor: '#4caf50',
        tension: 0.4,
      }
    ]
  };

  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <NetworkCheck /> Federated Learning Status
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3, mb: 3 }}>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Cloud sx={{ fontSize: 40, color: '#1976d2' }} />
          <Typography variant="h4">{globalAccuracy}%</Typography>
          <Typography variant="body2" color="textSecondary">Global Model Accuracy</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Storage sx={{ fontSize: 40, color: '#4caf50' }} />
          <Typography variant="h4">{participatingBanks}</Typography>
          <Typography variant="body2" color="textSecondary">Participating Banks</Typography>
        </Box>
      </Box>

      <Box sx={{ height: 300, mb: 3 }}>
        <Line 
          data={modelPerformanceData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Model Performance Over Time'
              }
            }
          }}
        />
      </Box>

      <Typography variant="subtitle1" gutterBottom>Active Model Updates</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {[...Array(4)].map((_, i) => (
          <ModelUpdateIndicator 
            key={i}
            bankId={`00${i + 1}`}
            status={i === 1 ? 'updating' : 'completed'}
            accuracy={85 + Math.random() * 10}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default FederatedLearningMetrics; 