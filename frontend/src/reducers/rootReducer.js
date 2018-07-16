import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import subCategoryReducer from './subCategoryReducer';

export default combineReducers({
 simpleReducer,
 subCategoryReducer
});