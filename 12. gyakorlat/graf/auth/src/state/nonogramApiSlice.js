import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const nonogramApiSlice = createApi({
  reducerPath: "nonogramApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getNonograms: build.query({
      query: () => ({ url: "puzzles" }),
      transformResponse: (response) => response.data,
    }),
    getNonogram: build.query({
      query: (id) => ({ url: `puzzles/${id}` }),
      transformResponse: (response) => JSON.parse(response.puzzle),
    }),
  }),
});

export const { useGetNonogramsQuery, useLazyGetNonogramQuery } =
  nonogramApiSlice;

export default nonogramApiSlice;
