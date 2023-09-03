import { Loader, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { useForm } from "@mantine/form";

const Login = () => {
  const form = useForm({
    initialValues: {
      email: "hhh@gmail.com",
      password: "123456789",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have 8 characters" : null,
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const nav = useNavigate();

  //test_mail_and_password
  //hhh@gmail.com
  //123456789

  const logInHandler = async (e) => {
    try {
      e.preventDefault();
      const user = { email, password };
      const { data } = await login(user);
      dispatch(addUser({ user: data?.user, token: data?.token }));
      console.log(data);
      if (data?.success) nav("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await login(values);
            dispatch(addUser({ user: data?.user, token: data?.token }));
            console.log(data);
            if (data?.success) nav("/");
          } catch (error) {
            console.log(error);
          }
        })}
        className="w-96 flex flex-col gap-10 shadow-lg p-7"
      >
        <h2 className="text-gray-500 font-medium text-2xl">Log in </h2>

        <TextInput
          placeholder="Enter your email ..."
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Enter your password ..."
          {...form.getInputProps("password")}
        />

        <div className="flex gap-3">
          <p className="select-none text-gray-700">Don't have an account?</p>
          <Link to={"/register"}>
            <button className="text-gray-700">Register</button>
          </Link>
        </div>
        <button type="submit" className="bg-blue-700 text-white px-4 py-1">
          {isLoading ? (
            <Loader color="gray" size="sm" className="mx-auto block" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
