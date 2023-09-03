import { Loader, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useCreateContactMutation } from "../redux/api/contact";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const [createContact] = useCreateContactMutation();
  const token = Cookies.get("token");
  const nav = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          const { data } = await createContact({ token, data: values });
          if (data?.success) nav("/");
          console.log(data);
        })}
        className="w-96 flex flex-col gap-10 shadow-lg p-7"
      >
        <h2 className="text-gray-500 font-medium text-2xl">Create Contact</h2>
        <TextInput placeholder="Name ..." {...form.getInputProps("name")} />
        <TextInput placeholder="Email ..." {...form.getInputProps("email")} />
        <TextInput
          placeholder="Phone Number ..."
          {...form.getInputProps("phone")}
        />
        <TextInput
          placeholder="Address ..."
          {...form.getInputProps("address")}
        />

        <button type="submit" className="bg-blue-700 text-white px-4 py-1">
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
