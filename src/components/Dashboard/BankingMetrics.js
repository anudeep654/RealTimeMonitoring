import React from 'react';
import { Box, Paper, Typography, LinearProgress, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import {
  AccountBalance,
  CreditCard,
  AttachMoney,
  Timeline,
  Shield,
} from '@mui/icons-material';

const RiskIndicator = ({ value, threshold }) => (
  <Box sx={{ 
    position: 'relative', 
    height: 60, 
    background: 'linear-gradient(90deg, #4caf50, #ffeb3b, #f44336)',
    borderRadius: 2,
    overflow: 'hidden'
  }}>
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: `${value}%` }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 4,
        height: '80%',
        backgroundColor: '#000',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      }}
    />
    <Typography 
      variant="caption" 
      sx={{ 
        position: 'absolute', 
        top: 5, 
        left: 10,
        color: 'white',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
      }}
    >
      Risk Level: {value}%
    </Typography>
  </Box>
);

const BankingMetrics = () => {
  const transactionData = {
    totalValue: '$2.5M',
    cardTransactions: 15234,
    onlineBanking: 8456,
    mobilePayments: 6789,
    riskLevel: 15,
    complianceScore: 98,
  };

  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccountBalance />
        Banking Intelligence Center
      </Typography>

      <Box sx={{ mt: 3, display: 'grid', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Real-time Transaction Analysis
          </Typography>
          <RiskIndicator value={transactionData.riskLevel} threshold={20} />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          {[
            { label: 'Card Transactions', value: transactionData.cardTransactions, icon: <CreditCard />, color: '#1a237e' },
            { label: 'Online Banking', value: transactionData.onlineBanking, icon: <Timeline />, color: '#0d47a1' },
            { label: 'Mobile Payments', value: transactionData.mobilePayments, icon: <AttachMoney />, color: '#1565c0' },
          ].map((metric, index) => (
            <Box key={index} sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: `${metric.color}10` }}>
              {React.cloneElement(metric.icon, { sx: { color: metric.color, fontSize: 30 } })}
              <Typography variant="h6" sx={{ color: metric.color, mt: 1 }}>
                {metric.value.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {metric.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Shield fontSize="small" />
            Compliance & Regulatory Status
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
            {[
              { label: 'KYC Compliance', status: 'Verified' },
              { label: 'AML Screening', status: 'Active' },
              { label: 'GDPR', status: 'Compliant' },
              { label: 'PSD2', status: 'Implemented' },
              { label: 'Basel III', status: 'Monitored' },
            ].map((item, index) => (
              <Chip
                key={index}
                label={`${item.label}: ${item.status}`}
                color="success"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default BankingMetrics; 