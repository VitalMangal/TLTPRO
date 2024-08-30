import { AuthErrorPropsType } from "../../types";

const AuthError = ({error, feedbackClasses}: AuthErrorPropsType) => {

    if (error) {
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

        return (
          <p className={feedbackClasses}>{errMsg + ' bla bla bla'}</p>
        )
      } 
      return <div>{error.message}</div>
    }
   return null;
};

export default AuthError;
