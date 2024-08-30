import { AuthErrorPropsType } from "../../types";

const AuthError = ({error, feedbackClasses}: AuthErrorPropsType) => {

    if (error) {
      if ('status' in error) {
        const errMsg = 'message' in error ? error.message : error.data.error;

        return (
          <p className={feedbackClasses}>{errMsg}</p>
        )
      } 
      return <div>{error.message}</div>
    }
   return null;
};

export default AuthError;
