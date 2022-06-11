import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const TasklistApiSlice = createApi({
  reducerPath: "tasklistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

  }),

  endpoints: (build) => ({
    getAllTasks: build.query({
      query: () => ({ url: "tasklists" }),
      transformResponse: (response) => response.data
    })
  })
});

export const { useGetAllTasksQuery } =
  TasklistApiSlice;

export default TasklistApiSlice;