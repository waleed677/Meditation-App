import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";
export const practicesApi = createApi({
  reducerPath: "practicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
  }),
  tagTypes: ['Practices'],
  endpoints: (builder) => ({
    getPractices: builder.query<any, void>({
      query: () => `practices.php`,
      providesTags: (result) =>
        result ? [{ type: 'Practices', id: 'LIST' }] : [],
    }),
    addPractices: builder.mutation({
      query: (body) => ({
        url: `practices.php`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: 'Practices', id: 'LIST' }],
    }),
  }),
});

export const { useGetPracticesQuery, useAddPracticesMutation } = practicesApi;
