import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import coreReducer from './coreReducer';

export default combineReducers({
  core: coreReducer
})
