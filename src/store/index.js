import { createStore, combineReducers } from 'redux';
import fieldsReducer from './fieldsReducer';
import configReducer from './configReducer';

const rootReducer = combineReducers({
  fields: fieldsReducer,
  config: configReducer,
});

const store = createStore(rootReducer);

export default store;
