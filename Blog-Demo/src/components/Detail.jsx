import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleBlogQuery } from "../feature/services/BlogApi";

const Detail = () => {
  const { id } = useParams();
  const { data: blog } = useGetSingleBlogQuery(id);
  return (
    <div className="flex justify-center mt-20">
      <div className="flex flex-col w-72 border shadow">
        <img className="h-[250px]" src={blog?.image} alt="" />
        <div className="p-4 flex flex-col gap-4">
          <h1>{blog?.title}</h1>
          <p>{blog?.desc}</p>
          <div className="flex gap-5">
            <Link to={`/`}>
              <button className=" text-gray-800 border border-gray-800 px-5 py-1">
                Back
              </button>
            </Link>
            <Link to={`/edit/${blog?.id}`}>
              <button className="bg-gray-800 text-white px-5 py-1">Edit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
