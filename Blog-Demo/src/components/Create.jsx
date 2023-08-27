import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetCreateBlogMutation } from "../feature/services/BlogApi";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const  [getCreateBlog]  = useGetCreateBlogMutation();
  const nav = useNavigate();

  const createBlogHandle = (e) => {
    e.preventDefault();
    console.log(title, desc, image);
    const newData = { id: Date.now(), title, desc, image };
    getCreateBlog(newData);
    nav("/");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={createBlogHandle}
        className=" flex flex-col gap-10 p-7 shadow-lg w-96"
      >
        <h2 className="text-2xl text-gray-700 font-semibold">Create a Blog</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title..."
          className="outline-none border-b border-b-gray-700"
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description..."
          className="outline-none border-b border-b-gray-700"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image Url..."
          className="outline-none border-b border-b-gray-700"
        />
        <div className="flex gap-5">
          <button className="bg-gray-800 text-white px-5 py-1">Create</button>

          <Link to={"/"}>
            <button className="bg-white text-gray-800 border border-gray-800 px-5 py-1">
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Create;
