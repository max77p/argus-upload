const initialState = {
  counter: 0,
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const newState = Object.assign({}, state);
      newState.counter = state.counter + action.payload.val;
      return newState;
    case 'STORERESULT':
      return {
        ...state,
        results: state.results.concat({
          id: new Date(),
          value: state.counter
        })
      }
    case "DELETERESULT":
      return {
        ...state,
        results: state.results.filter(result => result.id !== action.resultId)
      }
  }
  return state;
}

export default reducer;