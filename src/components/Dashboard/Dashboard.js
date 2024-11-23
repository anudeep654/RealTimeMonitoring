import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  Card,
  CardContent,
  Badge,
  Chip,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
  LinearProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  Dashboard as DashboardIcon,
  Security,
  Warning,
  CheckCircle,
  Speed,
  TrendingUp,
  Settings,
  Assessment,
  People,
  BusinessCenter,
  ExitToApp,
  Block,
  Science,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.styles.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement
} from 'chart.js';
import SecurityFeatures from './SecurityFeatures';
import BankingMetrics from './BankingMetrics';
import FederatedLearningMetrics from './FederatedLearningMetrics';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import APIConfigurationForm from '../AIConfig/APIConfigurationForm';
import Analytics from '../Analytics/Analytics';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const DRAWER_WIDTH = 280;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Suspicious activity detected', severity: 'warning', time: '2 minutes ago' },
    { id: 2, message: 'New login from unknown device', severity: 'warning', time: '5 minutes ago' },
    { id: 3, message: 'System update available', severity: 'info', time: '10 minutes ago' },
    { id: 4, message: 'High traffic alert', severity: 'error', time: '15 minutes ago' },
  ]);
  const [realtimeData, setRealtimeData] = useState({
    transactions: 1234,
    fraudulent: 23,
    success: 98.2,
    securityScore: 'A+',
    activeUsers: 856,
    avgResponseTime: 0.23,
    failedLogins: 12,
    riskScore: 15,
    pendingReview: 8,
    blockedIPs: 45,
    totalAlerts: 27,
    systemUptime: 99.99
  });

  // Menu handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleNotificationOpen = (event) => setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNotificationRead = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    handleNotificationClose();
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        transactions: prev.transactions + Math.floor(Math.random() * 5),
        fraudulent: prev.fraudulent + Math.floor(Math.random() * 2),
        success: ((prev.transactions - prev.fraudulent) / prev.transactions * 100).toFixed(1),
        securityScore: prev.securityScore,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10),
        avgResponseTime: prev.avgResponseTime + Math.random() * 0.01,
        failedLogins: prev.failedLogins + Math.floor(Math.random() * 2),
        riskScore: prev.riskScore + Math.floor(Math.random() * 2),
        pendingReview: prev.pendingReview + Math.floor(Math.random() * 2),
        blockedIPs: prev.blockedIPs + Math.floor(Math.random() * 5),
        totalAlerts: prev.totalAlerts + Math.floor(Math.random() * 5),
        systemUptime: prev.systemUptime + Math.random() * 0.01
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Transactions',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#1a237e',
        tension: 0.4,
      },
      {
        label: 'Fraud Attempts',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: '#ff3d00',
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction Monitoring (24h)'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const pieChartData = {
    labels: ['Successful', 'Fraudulent', 'Pending'],
    datasets: [{
      data: [85, 10, 5],
      backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
      borderWidth: 1,
    }],
  };

  const locationChartData = {
    labels: ['USA', 'Europe', 'Asia', 'Others'],
    datasets: [{
      data: [40, 30, 20, 10],
      backgroundColor: ['#1a237e', '#311b92', '#4a148c', '#6a1b9a'],
      borderWidth: 1,
    }],
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
      description: 'Overview & Analytics'
    },
    {
      text: 'AI Agent',
      icon: <Science />,
      path: '/dashboard/ai-config',
      description: 'Configure AI Models'
    },
    {
      text: 'Fraud Detection',
      icon: <Security />,
      path: '/dashboard/fraud',
      description: 'Monitor & Detect Fraud'
    },
    {
      text: 'Bank Integration',
      icon: <BusinessCenter />,
      path: '/dashboard/integration',
      description: 'API & SDK Setup'
    },
    {
      text: 'Analytics',
      icon: <Assessment />,
      path: '/dashboard/analytics',
      description: 'Advanced Analytics'
    },
    {
      text: 'Users',
      icon: <People />,
      path: '/dashboard/users',
      description: 'User Management'
    },
    {
      text: 'Settings',
      icon: <Settings />,
      path: '/dashboard/settings',
      description: 'System Configuration'
    }
  ];

  const drawer = (
    <Box sx={{ height: '100%', background: 'linear-gradient(180deg, #1a237e 0%, #0d47a1 100%)' }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Security sx={{ color: 'white', fontSize: 32 }} />
          </motion.div>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
            fraudGuard
          </Typography>
        </Box>
      </motion.div>

      <List sx={{ p: 2 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem
              button
              onClick={() => {
                navigate(item.path);
                if (mobileOpen) setMobileOpen(false);
              }}
              selected={location.pathname === item.path}
              sx={{
                mb: 1,
                borderRadius: 2,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                  '& .MuiListItemIcon-root': {
                    color: '#64b5f6'
                  }
                },
                '&.Mui-selected': {
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.2)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: '4px',
                    background: '#64b5f6',
                    borderRadius: '0 2px 2px 0'
                  }
                }
              }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <ListItemIcon sx={{ 
                  color: location.pathname === item.path ? '#64b5f6' : 'rgba(255,255,255,0.7)',
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
              </motion.div>
              <ListItemText
                primary={item.text}
                secondary={item.description}
                primaryTypographyProps={{
                  sx: { 
                    color: 'white',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                  }
                }}
                secondaryTypographyProps={{
                  sx: { color: 'rgba(255,255,255,0.6)' }
                }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );

  const pageTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          backgroundColor: '#1a237e',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              icon={<Speed />} 
              label="Live Monitoring" 
              color="success" 
              variant="outlined" 
              sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            />
            
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleNotificationOpen}>
                <Badge badgeContent={notifications.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Account">
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ 
          width: { sm: DRAWER_WIDTH }, 
          flexShrink: { sm: 0 } 
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              backgroundColor: '#f8f9fa',
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              backgroundColor: '#f8f9fa',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: '64px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={
                <Grid container spacing={3}>
                  {[
                    { 
                      title: 'Total Transactions',
                      value: realtimeData.transactions.toLocaleString(),
                      icon: <TrendingUp color="primary" />,
                      description: '24h Volume'
                    },
                    { 
                      title: 'Fraud Attempts',
                      value: realtimeData.fraudulent,
                      icon: <Warning color="error" />,
                      description: 'Blocked Attempts'
                    },
                    { 
                      title: 'Success Rate',
                      value: `${realtimeData.success}%`,
                      icon: <CheckCircle color="success" />,
                      description: 'Transaction Success'
                    },
                    { 
                      title: 'Active Users',
                      value: realtimeData.activeUsers,
                      icon: <People color="primary" />,
                      description: 'Currently Online'
                    },
                    { 
                      title: 'Response Time',
                      value: `${realtimeData.avgResponseTime}s`,
                      icon: <Speed color="primary" />,
                      description: 'Average Latency'
                    },
                    { 
                      title: 'Failed Logins',
                      value: realtimeData.failedLogins,
                      icon: <Block color="error" />,
                      description: 'Last Hour'
                    },
                    { 
                      title: 'Risk Score',
                      value: `${realtimeData.riskScore}%`,
                      icon: <Assessment color="warning" />,
                      description: 'System Risk Level'
                    },
                    { 
                      title: 'Pending Review',
                      value: realtimeData.pendingReview,
                      icon: <BusinessCenter color="info" />,
                      description: 'Needs Attention'
                    }
                  ].map((metric, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <motion.div whileHover={{ scale: 1.02 }} style={{ height: '100%' }}>
                        <Card className="dashboard-card">
                          <CardContent sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between',
                            p: 3 
                          }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Typography color="textSecondary" variant="subtitle2">
                                {metric.title}
                              </Typography>
                              {metric.icon}
                            </Box>
                            <Typography variant="h4" className="metric-value" sx={{ my: 2 }}>
                              {metric.value}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {metric.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}

                  {/* Security Features Section */}
                  <Grid item xs={12}>
                    <SecurityFeatures />
                  </Grid>

                  {/* Charts Row */}
                  <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 3, height: '400px' }} className="dashboard-card">
                      <Typography variant="h6" gutterBottom>
                        Transaction History (24h)
                      </Typography>
                      <Box sx={{ height: 'calc(100% - 40px)', position: 'relative' }}>
                        <Line data={chartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} lg={4}>
                    <Paper sx={{ p: 3, height: '400px' }} className="dashboard-card">
                      <Typography variant="h6" gutterBottom>
                        Security Risk Distribution
                      </Typography>
                      <Box sx={{ height: 'calc(100% - 40px)', position: 'relative' }}>
                        <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
                      </Box>
                    </Paper>
                  </Grid>

                  {/* Add real-time threat monitoring section */}
                  <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 3 }} className="dashboard-card">
                      <Typography variant="h6" gutterBottom>
                        Active Threat Monitoring
                      </Typography>
                      <Box sx={{ position: 'relative', height: '300px', backgroundColor: 'rgba(26,35,126,0.05)', borderRadius: 2, p: 2 }}>
                        {Array.from({ length: 8 }).map((_, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                              duration: 2 + Math.random() * 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            style={{
                              position: 'absolute',
                              width: 20 + Math.random() * 30,
                              height: 20 + Math.random() * 30,
                              borderRadius: '50%',
                              backgroundColor: `hsla(${Math.random() * 360}, 70%, 50%, 0.3)`,
                              left: `${Math.random() * 90}%`,
                              top: `${Math.random() * 90}%`,
                            }}
                          />
                        ))}
                        <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                          <Typography variant="body2" gutterBottom>
                            Threat Level: Moderate
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={65}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: 'rgba(255,152,0,0.2)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: '#ff9800',
                                borderRadius: 4,
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 3 }} className="dashboard-card">
                      <Typography variant="h6" gutterBottom>
                        Security Score Breakdown
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {[
                          { category: 'Authentication', score: 92, color: '#4caf50' },
                          { category: 'Network Security', score: 88, color: '#2196f3' },
                          { category: 'Data Encryption', score: 95, color: '#9c27b0' },
                          { category: 'Access Control', score: 85, color: '#ff9800' }
                        ].map((item, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <span>{item.category}</span>
                              <span>{item.score}%</span>
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={item.score}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: `${item.color}20`,
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: item.color,
                                  borderRadius: 4,
                                }
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <BankingMetrics />
                  </Grid>

                  <Grid item xs={12}>
                    <FederatedLearningMetrics />
                  </Grid>
                </Grid>
              } />
              <Route path="/ai-config" element={<APIConfigurationForm />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Dashboard;
