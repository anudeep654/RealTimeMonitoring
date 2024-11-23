import { ADD_CUSTOM_FIELD, SET_MODEL_TYPE, SET_NOTIFICATION_PREFERENCES } from './types';

const initialState = {
  transactionFields: {
    standard: ['transaction_id', 'user_id', 'amount', 'location', 'device_id'],
    custom: [],
  },
  modelType: '',
  notifications: {
    email: true,
    webhook: false,
    dashboard: true,
    sms: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOM_FIELD:
      return {
        ...state,
        transactionFields: {
          ...state.transactionFields,
          custom: [...state.transactionFields.custom, action.payload],
        },
      };
    case SET_MODEL_TYPE:
      return {
        ...state,
        modelType: action.payload,
      };
    case SET_NOTIFICATION_PREFERENCES:
      return {
        ...state,
        notifications: { ...state.notifications, ...action.payload },
      };
    case 'REMOVE_CUSTOM_FIELD':
      return {
        ...state,
        transactionFields: {
          ...state.transactionFields,
          standard: state.transactionFields.standard.filter((_, index) => index !== action.payload),
        },
      };
    default:
      return state;
  }
};

export default reducer;
