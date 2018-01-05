import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import coreReducer from './coreReducer';
import accountReducer from './accountReducer';

export default combineReducers({
  core: coreReducer,
  account: accountReducer
})
