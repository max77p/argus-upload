import { combineReducers } from 'redux';
// import simpleReducer from './simpleReducer';
import loginReducer from './loginReducer';
import uploadReducer from "./uploadReducer";

const rootReducer= combineReducers({
    login:loginReducer,
    afterUpload:uploadReducer
})

export default rootReducer;