import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h4`
  font-weight: bold;
  color: #1976d2;
`;

const Subtitle = styled.p`
  margin-bottom: 16px;
`;

const SelectContainer = styled.div`
  margin-bottom: 16px;
`;

const Select = styled.select`
  width: auto;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:hover {
    border-color: #1976d2;
  }
`;

const ModelInfoBox = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 16px;
`;

const ModelName = styled.h6`
  font-weight: bold;
`;

const ModelDescription = styled.p`
  color: #666;
`;

const ModelFeatures = styled.p`
  margin: 4px 0;
`;

const ModelSelection = () => {
  const proposedModels = [
    {
      name: 'RuleEngine-1',
      purpose: 'First-pass fraud filtering',
      algorithm: 'Hardcoded rules',
      features: 'Thresholds, location checks',
    },
    {
      name: 'FraudNet-Supervised',
      purpose: 'Fraud classification',
      algorithm: 'Random Forest, XGBoost',
      features: 'User history, metadata',
    },
    {
      name: 'FraudNet-Unsupervised',
      purpose: 'Anomaly detection',
      algorithm: 'Isolation Forest, Autoencoders',
      features: 'Behavioral analysis',
    },
    {
      name: 'PredictRisk-LSTM',
      purpose: 'Fraud prediction',
      algorithm: 'LSTM',
      features: 'Time-series transaction data',
    },
    {
      name: 'FederatedFraud-AI',
      purpose: 'Collaborative fraud intelligence',
      algorithm: 'Federated Averaging, Privacy Models',
      features: 'Cross-bank insights',
    },
    {
      name: 'ExplainFraud-XAI',
      purpose: 'Explainability for predictions',
      algorithm: 'SHAP, LIME',
      features: 'Feature importance',
    },
  ];

  const [selectedModel, setSelectedModel] = useState(proposedModels[0]); // Default to the first model

  const handleModelChange = (event) => {
    const selected = proposedModels.find(model => model.name === event.target.value);
    setSelectedModel(selected);
  };

  return (
    <CardContent>
      <Title>Select Model Suite</Title>
      <Subtitle>
        Explore our advanced models designed to enhance fraud detection and risk management.
      </Subtitle>

      <SelectContainer>
        <Select value={selectedModel.name} onChange={handleModelChange}>
          {proposedModels.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </Select>
      </SelectContainer>

      <ModelInfoBox>
        <ModelName>{selectedModel.name}</ModelName>
        <ModelDescription>{selectedModel.purpose}</ModelDescription>
        <p>Algorithm: {selectedModel.algorithm}</p>
        <strong>Key Features:</strong>
        <ModelFeatures>{selectedModel.features}</ModelFeatures>
      </ModelInfoBox>

      <Subtitle>
        Choose a model to learn more about its capabilities and how it can benefit your organization.
      </Subtitle>
    </CardContent>
  );
};

export default ModelSelection;
