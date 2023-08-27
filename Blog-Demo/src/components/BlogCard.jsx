import React from "react";
import { Link } from "react-router-dom";
import { useGetDeleteBlogMutation } from "../feature/services/BlogApi";

const BlogCard = ({ blog }) => {
  const [getDeleteBlog] = useGetDeleteBlogMutation();
  return (
    <div className="flex flex-col w-72 border shadow">
      <img
        className="h-[250px] object-cover bg-center"
        src={blog?.image}
        alt=""
      />
      <div className="p-4 flex flex-col gap-4">
        <h1>{blog?.title}</h1>
        <p>{blog?.desc}</p>
        <div className="flex gap-5">
          <Link to={`/detail/${blog?.id}`}>
            <button className="bg-gray-800 text-white px-5 py-1">Detail</button>
          </Link>
          <button onClick={()=>getDeleteBlog(blog?.id)} className="bg-red-500 text-white px-5 py-1">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
