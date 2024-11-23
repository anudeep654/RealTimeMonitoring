import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Button,
  Card,
} from '@mui/material';
import { AccountBalance, Settings, Security, Assessment, Notifications } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { addField } from '../../store/actions';
import TransactionDataFields from './MapperComponents/TransactionDataFields';
import ModelSelection from './MapperComponents/ModelSelection';
import FraudDetectionRules from './MapperComponents/FraudDetectionRules';
import RiskScoringConfiguration from './MapperComponents/RiskScoringConfiguration';
import NotificationPreferences from './MapperComponents/NotificationPreferences';
import AIIntegrationGuide from './MapperComponents/AIIntegrationGuide';

// Styled components
const StyledStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: '0',
  marginBottom: theme.spacing(4),
}));

const StepCard = styled(Card)(({ theme, active }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 12,
  boxShadow: active ? theme.shadows[5] : theme.shadows[2],
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[200],
  transition: 'background-color 0.3s, box-shadow 0.3s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '150px',
  textAlign: 'center',
  '&:hover': {
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.primary.light,
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const APIConfigurationForm = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);
  const transactionFields = useSelector((state) => state.fields.transactionFields);
  const [activeStep, setActiveStep] = useState(0);
  const [customField, setCustomField] = useState({ name: '', type: 'string', required: false, description: '' });
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);

  const modelTypes = [
    { value: 'lstm', label: 'LSTM Neural Network' },
    { value: 'transformer', label: 'Transformer Model' },
    { value: 'ensemble', label: 'Ensemble Model' },
  ];

  const steps = [
    {
      label: 'Transaction Data Fields',
      icon: <AccountBalance />,
      content: (
        <TransactionDataFields
          transactionFields={transactionFields}
          setCustomField={setCustomField}
          customField={customField}
          onAddField={(newField) => dispatch(addField(newField))}
        />
      ),
    },
    {
      label: 'Model Selection',
      icon: <Settings />,
      content: <ModelSelection modelTypes={modelTypes} config={config} />,
    },
    {
      label: 'Fraud Detection Rules',
      icon: <Security />,
      content: <FraudDetectionRules />,
    },
    {
      label: 'Risk Scoring Configuration',
      icon: <Assessment />,
      content: <RiskScoringConfiguration />,
    },
    {
      label: 'Notification Preferences',
      icon: <Notifications />,
      content: <NotificationPreferences />,
    },
  ];

  const progress = ((activeStep + 1) / steps.length) * 100;

  const handleFinish = () => {
    setShowIntegrationGuide(true);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 2, backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '80px' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', fontFamily: 'Poppins, sans-serif' }}>
          AI Configuration
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Configuration Progress</Typography>
            <Typography variant="body2" color="primary">{progress}% Complete</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4, backgroundColor: 'rgba(25, 118, 210, 0.08)', '& .MuiLinearProgress-bar': { borderRadius: 4, backgroundColor: 'primary.main' } }}
          />
        </Box>

        {showIntegrationGuide ? (
          <AIIntegrationGuide />
        ) : (
          <>
            <StyledStepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    <StepCard active={activeStep === index}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {React.cloneElement(step.icon, { sx: { color: activeStep === index ? 'white' : 'black' } })}
                        <Typography variant="body2" sx={{ color: activeStep === index ? 'white' : 'black', mt: 1 }}>{step.label}</Typography>
                      </Box>
                    </StepCard>
                  </StepLabel>
                </Step>
              ))}
            </StyledStepper>

            <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
              {steps[activeStep].content}
            </Card>
          </>
        )}
      </Paper>

      <Footer>
        <Button disabled={activeStep === 0} onClick={() => setActiveStep((prev) => prev - 1)}>Back</Button>
        <Button variant="contained" onClick={() => {
          if (activeStep === steps.length - 1) {
            handleFinish();
          } else {
            setActiveStep((prev) => prev + 1);
          }
        }}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Footer>
    </motion.div>
  );
};

export default APIConfigurationForm;
