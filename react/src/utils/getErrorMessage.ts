import { RTKQueryErrorType } from "../types";

const GetErrorMessage = (error: RTKQueryErrorType) => {
  if ('status' in error) {
    const errMsg = 'message' in error ? error.message : error.data.error;

    return errMsg;
  } 
  return error.message
};

export default GetErrorMessage;
