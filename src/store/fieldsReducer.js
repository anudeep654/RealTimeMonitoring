import { ADD_FIELD, REMOVE_FIELD } from './actionTypes';

const initialState = {
  transactionFields: [
    { name: 'location', type: 'string', required: true },
    { name: 'amount', type: 'number', required: false },
    { name: 'from_account', type: 'boolean', required: true },
  ],
};

const fieldsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FIELD:
      return {
        ...state,
        transactionFields: [...state.transactionFields, action.payload],
      };
    case REMOVE_FIELD:
      return {
        ...state,
        transactionFields: state.transactionFields.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default fieldsReducer;
