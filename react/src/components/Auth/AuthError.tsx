import { AuthErrorPropsType } from "../../types";
import GetErrorMessage from "../../utils/getErrorMessage";

const AuthError = ({error, feedbackClasses}: AuthErrorPropsType) => {

    if (error) {
      const errorMsg = GetErrorMessage(error);
      return <p className={feedbackClasses}>{errorMsg}</p>
    }
   return null;
};

export default AuthError;
