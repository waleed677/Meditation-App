import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const resourcesArticlesApi = createApi({
  reducerPath: "resourcesArticlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["ResourcesArticles"],
  endpoints: (builder) => ({
    getResourcesArticles: builder.query<any, any>({
      query: ({ searchQuery, id }) =>
        `resource_articles.php${
          searchQuery || id
            ? `?search=${searchQuery != null ? searchQuery : ""}${
                id ? `&practices_id=${id}` : ""
              }`
            : ""
        }`, // Note that this is relative to the baseUrl
    }),
    addResourcesArticles: builder.mutation({
      query: (body) => ({
        url: `resource_articles.php`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ResourcesArticles", id: "LIST" }],
    }),
  }),
});

export const { useGetResourcesArticlesQuery, useAddResourcesArticlesMutation } =
  resourcesArticlesApi;
