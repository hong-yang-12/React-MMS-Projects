import { Loader, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useRegisterMutation } from "../redux/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

const Register = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have 8 characters" : null,
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await register(values);
            console.log(data);
            if (data?.success) nav("/login");
          } catch (error) {
            console.log(error);
          }
        })}
        className="w-96 flex flex-col gap-10 shadow-lg p-7"
      >
        <h2 className="text-gray-500 font-medium text-2xl">Register</h2>
        <TextInput
          placeholder="Enter your name ..."
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="Enter your email ..."
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Enter your password ..."
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="Password Confirm ..."
          {...form.getInputProps("password_confirmation")}
        />
        <div className="flex gap-3">
          <p className="select-none text-gray-700">Already have an account?</p>
          <Link to={"/login"}>
            <button className="text-gray-700">Login</button>
          </Link>
        </div>
        <button
          disabled={isLoading && true}
          type="submit"
          className="bg-blue-700 text-white px-4 py-1"
        >
          {isLoading ? (
            <Loader color="gray" size="sm" className="mx-auto block" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
