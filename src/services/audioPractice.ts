import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";

export const audioPracticeApi = createApi({
  reducerPath: "audioPracticeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
  }),
  endpoints: (builder) => ({
    getAudioPractice: builder.query<any, any>({
      query: ({ searchQuery }) => `audio_practice.php${searchQuery ? `?search=${searchQuery != null ? searchQuery : ""}` : ""}`,
    }),
    addAudioPractice: builder.mutation({
      query: (body) => ({
        url: `audio_practice.php`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAudioPracticeQuery, useAddAudioPracticeMutation } =
  audioPracticeApi;
