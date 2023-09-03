import Cookies from "js-cookie";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/api/contact";

const UserInfo = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data } = useGetSingleContactQuery({ id, token });
  console.log(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-5 p-7 shadow-lg">
        <img
          src={
            data?.contact?.photo === null
              ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              : data?.contact?.photo
          }
          width={"150px"}
          alt=""
        />
        <p>Name : {data?.contact?.name}</p>
        <p>Email : {data?.contact?.email}</p>
        <p>Phone : {data?.contact?.phone}</p>
        <p>Address : {data?.contact?.address}</p>
        <Link to={"/"}>
          <button className="bg-teal-500 px-5 py-1 text-white">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
