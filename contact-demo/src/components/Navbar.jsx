import React from "react";
// import { useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/services/authSlice";

const Navbar = () => {
  const user = JSON.parse(Cookies.get("user"));
  const  token  = Cookies.get("token");

  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.authSlice);
  // const { token } = useSelector((state) => state.authSlice);
  const [logout] = useLogoutMutation();

  const nav = useNavigate();

  const logoutHandler = async () => {
    const { data } = await logout(token);
    console.log(data);
    dispatch(removeUser());
    if (data?.success) nav("/login");
  };

  return (
    <div className="flex justify-around p-7 shadow-lg items-center">
      <h2 className="text-2xl text-gray-700 font-semibold">MMS</h2>
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-3">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-4 py-1"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
