import React, { useState } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Height } from "@mui/icons-material";

export default function DetailedAPIIntegration() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const endpoint = "https://fraudguard.api.example.com/v1/validate";
  const queryParams = [
    { name: "transactionId", type: "string", required: true, description: "Unique ID of the transaction." },
    { name: "amount", type: "float", required: true, description: "Transaction amount." },
    { name: "currency", type: "string", required: true, description: "Currency code (e.g., USD)." },
    { name: "customerId", type: "string", required: true, description: "Unique ID of the customer." },
  ];
  const payload = {
    transactionId: "12345",
    amount: 500.0,
    currency: "USD",
    customerId: "67890",
  };
  const payloadParams = [
    { name: "transactionId", type: "string", description: "Unique transaction ID to validate." },
    { name: "amount", type: "float", description: "Transaction amount." },
    { name: "currency", type: "string", description: "Currency of the transaction." },
    { name: "customerId", type: "string", description: "ID of the customer making the transaction." },
  ];
  const headers = [
    { name: "Authorization", value: "Bearer YOUR_API_KEY", description: "Your API key for authentication." },
    { name: "Content-Type", value: "application/json", description: "Indicates the request body format." },
  ];
  const successResponse = {
    success: true,
    riskScore: 0.2,
    message: "Transaction is low-risk",
  };
  const errorResponse = {
    success: false,
    error: "Invalid API key",
    code: 401,
  };

  const tabsContent = [
    {
      label: "API",
      content: (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            API Endpoint
          </Typography>
          <Box sx={styles.codeBlock}>{endpoint}</Box>
          <Typography variant="h6" gutterBottom>
            Query Parameters
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Required</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {queryParams.map((param) => (
                  <TableRow key={param.name}>
                    <TableCell>{param.name}</TableCell>
                    <TableCell>{param.type}</TableCell>
                    <TableCell>{param.required ? "Yes" : "No"}</TableCell>
                    <TableCell>{param.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ),
    },
    {
      label: "Payload",
      content: (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            Request Payload
          </Typography>
          <Box sx={styles.codeBlock}>{JSON.stringify(payload, null, 2)}</Box>
          <Typography variant="h6" gutterBottom>
            Payload Parameters
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payloadParams.map((param) => (
                  <TableRow key={param.name}>
                    <TableCell>{param.name}</TableCell>
                    <TableCell>{param.type}</TableCell>
                    <TableCell>{param.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ),
    },
    {
      label: "Headers",
      content: (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            Request Headers
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Header</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {headers.map((header) => (
                  <TableRow key={header.name}>
                    <TableCell>{header.name}</TableCell>
                    <TableCell>{header.value}</TableCell>
                    <TableCell>{header.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ),
    },
    {
      label: "Response",
      content: (
        <Box>
          <Typography variant="h6" gutterBottom color="primary">
            Success Response
          </Typography>
          <Box sx={styles.codeBlock}>{JSON.stringify(successResponse, null, 2)}</Box>
          <Typography variant="h6" gutterBottom color="primary">
            Error Response
          </Typography>
          <Box sx={styles.codeBlock}>{JSON.stringify(errorResponse, null, 2)}</Box>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardHeader
          title="FraudGuard API Integration"
          action={
            <IconButton
              color="primary"
              onClick={() =>
                handleCopy(
                  selectedTab === 0
                    ? endpoint
                    : selectedTab === 1
                    ? JSON.stringify(payload, null, 2)
                    : JSON.stringify(headers, null, 2)
                )
              }
            >
              {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
            </IconButton>
          }
        />
        <AppBar position="static" color="default">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {tabsContent.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </AppBar>
        <CardContent>{tabsContent[selectedTab]?.content}</CardContent>
      </Card>
    </Box>
  );
}

const styles = {
  container: {
    padding: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    maxWidth: 900,
    Height: "auto",
    margin: "auto",
    borderRadius: 8,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  },
  codeBlock: {
    backgroundColor: "#f7f7f7",
    padding: 4,
    borderRadius: 8,
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    overflowX: "auto",
  },
};
