import { combineReducers } from 'redux';
// import simpleReducer from './simpleReducer';
import loginReducer from './loginReducer';
import uploadReducer from "./uploadReducer";

const rootReducer= combineReducers({
    loginR:loginReducer,
    uploadR:uploadReducer
})

export default rootReducer;