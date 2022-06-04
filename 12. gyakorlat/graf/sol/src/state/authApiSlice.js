import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TAG_USER = "User"
const BASE_URL = "http://localhost:3030/";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', token)
      }
  
      return headers
    },
  }),
  tagTypes: [TAG_USER],
  endpoints: (builder) => ({
    getUser: builder.query<{user}, string>({
      query: (id) => ({ url: `user/${id}` }),
      providesTags: [TAG_USER]
    }),
  }),
})