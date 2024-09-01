import { SerializedError } from "@reduxjs/toolkit";

export type CustomizedFetchBaseQueryError = {
  status: number,
  data: {
    error: string,
  }
} | {
  status: number,
  message: string,
};

export type RTKQueryErrorType = CustomizedFetchBaseQueryError | SerializedError;

export type AuthErrorPropsType = {
  error: RTKQueryErrorType | undefined,
  feedbackClasses: string,
};