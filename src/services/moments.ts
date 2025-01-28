import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";
export const momentApi = createApi({
  reducerPath: "momentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
  }),
  endpoints: (builder) => ({
    getMoment: builder.query<any, void>({
      query: () => `moments.php`,
    }),
    addMoment: builder.mutation({
      query: (body) => ({
        url: `moments.php`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetMomentQuery, useAddMomentMutation } = momentApi;
