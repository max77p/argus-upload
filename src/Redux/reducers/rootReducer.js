import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import contactReducer from "./contactReducer";


const rootReducer= combineReducers({
    loginR:loginReducer,
    contactR:contactReducer
})

export default rootReducer;