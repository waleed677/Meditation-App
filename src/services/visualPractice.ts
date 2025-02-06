import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";

export const visualPracticeApi = createApi({
  reducerPath: "visualPracticeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`, // Ensure this is your correct base URL for the API
  }),
  endpoints: (builder) => ({
    getVisualPractice: builder.query<any, any>({
      query: ({ searchQuery, min, max, id }) =>
        `visual_practice.php${
          searchQuery || (min ? min : "") || (max ? max : "") || id
            ? `?search=${searchQuery != null ? searchQuery : ""}&min=${
                min ? min : ""
              }&max=${max ? max : ""}${id ? `&practices_id=${id}` : ""}`
            : ""
        }`, // Note that this is relative to the baseUrl
    }),
    addVisualPractice: builder.mutation({
      query: (body) => ({
        url: "visual_practice.php", // Same for POST request
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetVisualPracticeQuery, useAddVisualPracticeMutation } =
  visualPracticeApi;
