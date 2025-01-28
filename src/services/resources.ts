import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";
export const resourcesApi = createApi({
  reducerPath: "resourcesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
  }),
  tagTypes: ['Resources'],
  endpoints: (builder) => ({
    getResources: builder.query<any, void>({
      query: () => `resources.php`,
      providesTags: (result) =>
        result ? [{ type: 'Resources', id: 'LIST' }] : [],
    }),
    addResources: builder.mutation({
      query: (body) => ({
        url: `resources.php`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: 'Resources', id: 'LIST' }],
    }),
  }),
});

export const { useGetResourcesQuery, useAddResourcesMutation } = resourcesApi;
