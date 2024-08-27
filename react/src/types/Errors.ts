import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type AuthErrorPropsType = {
  error: FetchBaseQueryError | SerializedError | undefined,
  feedbackClasses: string,
};