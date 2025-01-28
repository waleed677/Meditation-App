import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users.php`,
      providesTags: (result) =>
        result ? [{ type: 'Users', id: 'LIST' }] : [],
    }),
    addUsers: builder.mutation({
      query: (body) => ({
        url: `users.php`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const { useGetUsersQuery, useAddUsersMutation } =
  usersApi;
