const initialState = {
  user: '',
  pass: '',
  acToken: '',
  idToken: '',
  error: '',
  loading: false,
  loggedIn: false,
  changePass: false,
  session: '',
  reRoute: false,
  mfa:false
};

const reducer = (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'USERSTART':
      return {
        ...state,
        error: '',
        loading: true
      }
      case 'CONFIRMMFA':
      return{
        ...state,
        mfa:true,
        session: action.payload.response.session,
        user:action.payload.response.user,
        loading: false
      }
    case 'CHANGEPASS':
      return {
        ...state,
        changePass: action.payload.response.changePass,
        session: action.payload.response.session,
        user:action.payload.user
      }
    case 'PASSCHANGED':
      return {
        ...state,
        error: '',
        session: action.payload.response.session,
        changePass:false,
        loggedIn: false,
        loading: false,
        user:action.payload.response.user,
        mfa:true
      }
    case 'USERSUCCESS':
      return {
        ...state,
        acToken: action.payload.response.accessToken,
        idToken: action.payload.response.idToken,
        user: action.payload.response.user,
        session:'',
        mfa:false,
        loading: false,
        loggedIn: true
      }
    case 'USERFAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
        loggedIn: false
      }
      case 'LOGOUTUSER':
      return{
        ...state,
        loggedIn:false
      }
      default:
      //will not execute
  }
  return state;
}

export default reducer;