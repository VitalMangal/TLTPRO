import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type AuthErrorPropsType = {
  error: FetchBaseQueryError | SerializedError | undefined,
  feedbackClasses: string,
};

const AuthError = ({error, feedbackClasses}: AuthErrorPropsType) => {

    if (error) {
      if ('status' in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

        return (
          <p className={feedbackClasses}>{errMsg}</p>
        )
      } 
      // you can access all properties of `SerializedError` here
      return <div>{error.message}</div>
    }
   return null;
};

export default AuthError;
