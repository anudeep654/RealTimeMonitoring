import React from 'react';
import { Box, Paper, Typography, LinearProgress, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BugReport, Memory, NetworkCheck } from '@mui/icons-material';

const SecurityScore = ({ score, category, details }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {category}
      <span>{score}%</span>
    </Typography>
    <Tooltip title={details}>
      <LinearProgress 
        variant="determinate" 
        value={score} 
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(26,35,126,0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: score > 70 ? '#4caf50' : score > 40 ? '#ff9800' : '#f44336',
            borderRadius: 4,
          }
        }}
      />
    </Tooltip>
  </Box>
);

const AnomalyBubble = ({ size, color, position, pulse }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ 
      scale: pulse ? [1, 1.2, 1] : 1,
      opacity: pulse ? [0.7, 1, 0.7] : 0.7
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: color,
      left: position.x,
      top: position.y,
    }}
  />
);

const SecurityFeatures = () => {
  const securityMetrics = [
    { category: 'Authentication Strength', score: 92, details: 'MFA enabled, Password policies enforced' },
    { category: 'Network Security', score: 88, details: 'SSL/TLS, DDoS protection active' },
    { category: 'Data Encryption', score: 95, details: 'AES-256 encryption, End-to-end encryption' },
    { category: 'Access Control', score: 85, details: 'Role-based access, IP whitelisting' },
  ];

  return (
    <Paper sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
      <Typography variant="h6" gutterBottom>
        Security Intelligence Hub
      </Typography>

      {/* AI Anomaly Detection Visualization */}
      <Box sx={{ height: 200, position: 'relative', mb: 3, backgroundColor: 'rgba(26,35,126,0.05)', borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ position: 'absolute', top: 10, left: 10 }}>
          Real-time Anomaly Detection
        </Typography>
        {/* Generate random anomaly bubbles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <AnomalyBubble
            key={i}
            size={20 + Math.random() * 30}
            color={`hsla(${Math.random() * 360}, 70%, 50%, 0.3)`}
            position={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%' 
            }}
            pulse={Math.random() > 0.7}
          />
        ))}
      </Box>

      {/* Security Score Breakdown */}
      <Box sx={{ mb: 3 }}>
        {securityMetrics.map((metric, index) => (
          <SecurityScore key={index} {...metric} />
        ))}
      </Box>

      {/* Active Security Features */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
        {[
          { icon: <Shield />, label: 'Firewall Active', color: '#4caf50' },
          { icon: <BugReport />, label: 'Threat Scanner', color: '#ff9800' },
          { icon: <Memory />, label: 'AI Monitor', color: '#2196f3' },
          { icon: <NetworkCheck />, label: 'Network Guard', color: '#9c27b0' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 2,
                textAlign: 'center',
                backgroundColor: `${feature.color}10`,
                border: `1px solid ${feature.color}30`,
              }}
            >
              {React.cloneElement(feature.icon, { sx: { color: feature.color, fontSize: 30 } })}
              <Typography variant="body2" sx={{ mt: 1, color: feature.color }}>
                {feature.label}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Paper>
  );
};

export default SecurityFeatures; 