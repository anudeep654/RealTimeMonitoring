import { ADD_FIELD, REMOVE_FIELD, SET_MODEL_TYPE } from './actionTypes';

export const addField = (field) => ({
  type: ADD_FIELD,
  payload: field,
});

export const removeField = (index) => ({
  type: REMOVE_FIELD,
  payload: index,
});

export const setModelType = (modelType) => ({
  type: SET_MODEL_TYPE,
  payload: modelType,
});
