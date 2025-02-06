import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";
export const resourcesApi = createApi({
  reducerPath: "resourcesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
  }),
  tagTypes: ["Resources"],
  endpoints: (builder) => ({
    getResources: builder.query<any, void>({
      query: () => `resources.php`,
      providesTags: (result) =>
        result ? [{ type: "Resources", id: "LIST" }] : [],
    }),
    getResourcesArticles: builder.query<any, any>({
      query: ({ searchQuery, id }) =>
        `resource_articles.php${
          searchQuery || id
            ? `?search=${searchQuery != null ? searchQuery : ""}${
                id ? `&resource_id=${id}` : ""
              }`
            : ""
        }`, // Note that this is relative to the baseUrl
    }),
    addResources: builder.mutation({
      query: (body) => ({
        url: `resources.php`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Resources", id: "LIST" }],
    }),
    getSettings: builder.query({
      query: () => `settings.php`,
      providesTags: (result) => (result ? [{ type: "Users", id: "LIST" }] : []),
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useGetResourcesArticlesQuery,
  useAddResourcesMutation,
  useGetSettingsQuery,
} = resourcesApi;
