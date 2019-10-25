const initialState = {
  filename: '',
  fileObj: null,
  s3positive: null,
  s3negative: null,
  uploadProgress: false,
  statusCode: null,
  fileTypeError: null,
  signOut: null
};

const reducer = (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'UPLOADPROGRESS':
      return {
        ...state,
        s3negative: null,
        statusCode: null,
        uploadProgress: true
      }
    case 'SENDSUCCESS':
      return {
        ...state,
        s3positive: action.payload.data.putData,
        uploadProgress: false,
        s3negative: null,
        statusCode: null,
        signOut: action.payload.data.signOut,
      }
      case 'SENDPARTNERERROR':
      return{
        ...state,
        s3negative: action.payload,
        uploadProgress: false
      }
    case 'SENDERROR':
      return {
        ...state,
        s3negative: action.payload,
        statusCode: action.payload.data,
        code: action.payload.data,
        uploadProgress: false,
        signOut:action.payload.data.signOut
      }
    case 'FILECHECK':
      return {
        ...state,
        fileTypeError: action.payload
      }
    case 'RESETONERROR':
      return {
        ...state,
        s3negative:action.payload
      }
    case 'RESETONSUCCESS':
      return {
        ...state,
        filename: '',
        fileObj: null,
        s3positive: null,
        s3negative: null,
        uploadProgress: false,
        statusCode: null,
        fileTypeError: null,
        signOut: null
      }
      default:
      //will not execute
  }
  return state;
}

export default reducer;