import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const TasksApiSlice = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getAllTasks: build.query({
      query: () => ({ url: "tasks" }),
      transformResponse: (response) => response.data,
    })
  }),
});

export const { useGetAllTasksQuery } =
  TasksApiSlice;

export default TasksApiSlice;