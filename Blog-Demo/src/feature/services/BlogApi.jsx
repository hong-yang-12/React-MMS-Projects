import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/` }),
  tagTypes: ["blogApi"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: ["blogApi"],
    }),
    getSingleBlog: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: ["blogApi"],
    }),
    getCreateBlog: builder.mutation({
      query: (blog) => ({
        url: `/blogs`,
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["blogApi"],
    }),
    getDeleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["blogApi"],
    }),
    getEditBlog: builder.mutation({
      query: (newData) => ({
        url: `/blogs/${newData?.id}`,
        method: "PATCH",
        body: newData,
      }),
      invalidatesTags: ["blogApi"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useGetCreateBlogMutation,
  useGetDeleteBlogMutation,
  useGetEditBlogMutation,
} = blogApi;
