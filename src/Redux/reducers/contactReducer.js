const initialState = {
   contactstatus:''
  };
  
  const reducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
      case "CONTACTSTATUS":
        return {
          ...state,
          contactstatus:action.payload
        }
        default:
        //will not execute
    }
    return state;
  }
  
  export default reducer;