import { combineReducers } from 'redux';
import axiosConfig from './auth';
import userInfo from './user';

const rootReducer = combineReducers({
    axiosConfig,
    userInfo,
});

export default rootReducer;