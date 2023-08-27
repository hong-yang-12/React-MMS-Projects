import React from "react";
import { useGetBlogsQuery } from "../feature/services/BlogApi";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { data: blogs } = useGetBlogsQuery();
  return (
    <>
      <Link to={"/create"}>
        <div className="flex justify-center mt-10">
          <button className="bg-gray-800 text-white px-5 py-1">Create</button>
        </div>
      </Link>
      <div className="flex flex-wrap justify-center gap-8 mt-20">
        {blogs?.map((blog) => {
          return <BlogCard key={blog.id} blog={blog} />;
        })}
      </div>
    </>
  );
};

export default Blogs;
