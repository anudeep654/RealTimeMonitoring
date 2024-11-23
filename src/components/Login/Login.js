import React, { useState } from 'react';
import { Box, Container, Paper, Typography, Divider, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CustomTextField from '../../UILibrary/TextField/CustomTextField';
import CustomButton from '../../UILibrary/Button/CustomButton';
import './Login.styles.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState({
    identifier: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError({
      ...error,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.identifier) {
      setError(prev => ({...prev, identifier: 'Email or phone number is required'}));
      return;
    }
    if (!formData.password) {
      setError(prev => ({...prev, password: 'Password is required'}));
      return;
    }
    navigate('/dashboard');
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate('/dashboard');
  };

  return (
    <Box className="login-container">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,35,126,0.3) 0%, rgba(10,25,41,0) 70%)',
          top: '-250px',
          left: '-250px',
        }}
      />

      <Container component="main" maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Paper className="login-paper">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Box className="login-icon-container">
                    <SecurityIcon sx={{ color: 'white', fontSize: 40 }} />
                  </Box>
                </motion.div>

                <Typography variant="h4" className="login-title">
                  fraudGuard
                </Typography>

                <Typography variant="body2" className="login-subtitle">
                  Secure your business with real-time fraud detection
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <CustomTextField
                    autoFocus
                    icon={<AlternateEmailIcon />}
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    name="identifier"
                    autoComplete="email"
                    value={formData.identifier}
                    onChange={handleChange}
                    error={!!error.identifier}
                    helperText={error.identifier}
                  />

                  <CustomTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!error.password}
                    helperText={error.password}
                    icon={<LockOutlinedIcon color="primary" />}
                  />

                  <CustomButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.light',
                      },
                    }}
                  >
                    Sign In
                  </CustomButton>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Link 
                      href="#" 
                      variant="body2" 
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': { color: 'primary.light' }
                      }}
                    >
                      Forgot password?
                    </Link>
                    <Link 
                      href="#" 
                      variant="body2" 
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': { color: 'primary.light' }
                      }}
                    >
                      Sign Up
                    </Link>
                  </Box>

                  <Divider sx={{ my: 2 }}>OR</Divider>

                  <Box sx={{ width: '100%' }}>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => console.log('Login Failed')}
                      size="large"
                      width="100%"
                      theme="filled_blue"
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;