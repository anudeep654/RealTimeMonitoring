import { SET_MODEL_TYPE } from './actionTypes';

const initialState = {
  modelType: '',
  dataFeatures: [],
  trainingParams: {
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
  },
  privacySettings: {
    encryptData: true,
    anonymizeFields: true,
    federatedLearning: true,
  },
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODEL_TYPE:
      return {
        ...state,
        modelType: action.payload,
      };
    default:
      return state;
  }
};

export default configReducer;
