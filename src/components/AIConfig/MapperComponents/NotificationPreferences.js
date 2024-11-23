import React, { useState } from 'react';
import { CardContent, Typography, Tabs, Tab, Box, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotificationPreferences = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <CardContent>
      <Typography variant="h6" gutterBottom align="center">Notification Preferences</Typography>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Channels" />
        <Tab label="Triggers" />
        <Tab label="Rules" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="h6" gutterBottom>Notification Channels</Typography>
        <Grid container spacing={2}>
          {['Email Notifications', 'SMS Notifications', 'Webhook', 'Slack/Teams', 'Push Notifications'].map((label) => (
            <Grid item xs={12} sm={6} key={label}>
              <FormControlLabel control={<Checkbox />} label={label} />
              <Button variant="outlined">Configure</Button>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6" gutterBottom>Notification Types</Typography>
        <Grid container spacing={2}>
          {['Fraud Alerts', 'High-Risk Transactions', 'Medium-Risk Transactions', 'Transaction Statistics', 'Daily Summary', 'Weekly Summary', 'System Health Alerts', 'API Usage', 'Model Accuracy Issues'].map((label) => (
            <Grid item xs={12} sm={6} key={label}>
              <FormControlLabel control={<Checkbox />} label={label} />
              <Button variant="outlined">Configure</Button>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6" gutterBottom>Custom Rules for Notifications</Typography>
        <Typography>Rule: If Transaction Amount > $10K AND Risk Score > 0.8</Typography>
        <Typography>Action: Send Email to fraud-team@bank.com</Typography>
        <Button variant="outlined">Add New Rule</Button>
      </TabPanel>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="outlined">Cancel</Button>
      </Box>
    </CardContent>
  );
};

// Helper component for tab panels
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default NotificationPreferences;
