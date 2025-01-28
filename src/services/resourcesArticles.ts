import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const resourcesArticlesApi = createApi({
  reducerPath: "resourcesArticlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ['ResourcesArticles'],
  endpoints: (builder) => ({
    getResourcesArticles: builder.query({
      query: () => `resource_articles.php`,
      providesTags: (result) =>
        result ? [{ type: 'ResourcesArticles', id: 'LIST' }] : [],
    }),
    addResourcesArticles: builder.mutation({
      query: (body) => ({
        url: `resource_articles.php`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: 'ResourcesArticles', id: 'LIST' }],
    }),
  }),
});

export const { useGetResourcesArticlesQuery, useAddResourcesArticlesMutation } = resourcesArticlesApi;
