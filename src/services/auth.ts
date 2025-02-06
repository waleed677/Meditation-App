import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
    prepareHeaders: (headers) => {
      // const token = localStorage.getItem("authToken");
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `admin_auth.php?action=login`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json", // example for a different content type
        },
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: `admin_auth.php?action=register`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json", // example for a different content type
        },
      }),
    }),
    updateUserInfo: builder.mutation({
      query: (body) => ({
        url: `admin_auth.php?action=update`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json", // example for a different content type
        },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `admin_auth.php?action=forgot-password`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json", // example for a different content type
        },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `admin_auth.php?action=verify-otp`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `admin_auth.php?action=reset-password`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json", // example for a different content type
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateUserInfoMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
