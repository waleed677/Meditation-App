import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";
export const favouritesApi = createApi({
  reducerPath: "favouritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
  }),
  tagTypes: ["Favourites"],
  endpoints: (builder) => ({
    getFavourites: builder.query<any, any>({
      query: ({ searchQuery, userId, typeName, activityId }) =>
        `favourites.php${
          searchQuery || userId
            ? `?search=${
                searchQuery != null ? searchQuery : ""
              }&user_id=${userId}`
            : ""
        }`,
    }),
    addFavourites: builder.mutation({
      query: (body) => ({
        url: `favourites.php`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Favourites", id: "LIST" }],
    }),
  }),
});

export const { useGetFavouritesQuery, useAddFavouritesMutation } =
  favouritesApi;
