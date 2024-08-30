import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type CustomizedFetchBaseQueryError = {
  status: number,
  data: {
    error: string,
  }
} | {
  status: number,
  message: string,
};

export type AuthErrorPropsType = {
  error: CustomizedFetchBaseQueryError | SerializedError | undefined,
  feedbackClasses: string,
};