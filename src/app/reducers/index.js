import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import coreReducer from './coreReducer';
import accountReducer from './accountReducer';
import modalReducer from './modalReducer';
import marketplaceReducer from './marketplaceReducer';
import arenaReducer from './arenaReducer';

export default combineReducers({
  core: coreReducer,
  account: accountReducer,
  modal: modalReducer,
  marketplace: marketplaceReducer,
  arena: arenaReducer
})
