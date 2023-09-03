import { Button, Input, Loader, Menu, Table, Text } from "@mantine/core";
import React, { useEffect } from "react";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contact";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, setSearchTerms } from "../redux/services/contactSlice";

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  // console.log(data?.contacts?.data);

  const [deleteContact] = useDeleteContactMutation();
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const { data } = await deleteContact({ id, token });
        console.log(data);
      }
    });
  };

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searchTerms = useSelector((state) => state.contactSlice.searchTerms);

  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data]);

  const row = contacts
    ?.filter((item) => {
      if (searchTerms === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(searchTerms?.toLocaleLowerCase())
      ) {
        return item;
      }
    })
    .map((contact) => {
      return (
        <tr key={contact?.id}>
          <td>{contact?.name}</td>
          <td>
            {contact?.email === "null" ? "example@gmail.com" : contact?.email}
          </td>
          <td>{contact?.phone}</td>
          <td>
            {contact?.address === "null"
              ? "somewhere on earth"
              : contact?.address}
          </td>
          <td>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <button className="bg-gray-200 px-2">...</button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>
                  <p
                    className="flex items-center gap-2"
                    onClick={() => deleteHandler(contact?.id)}
                  >
                    <BsTrash />
                    <span>Delete</span>
                  </p>
                </Menu.Item>
                <Link to={`/user/${contact?.id}`}>
                  <Menu.Item>User Info</Menu.Item>
                </Link>
              </Menu.Dropdown>
            </Menu>
          </td>
        </tr>
      );
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="mt-5 p-5">
      <div className="flex gap-5">
        <Link to={"/create"}>
          <button className="bg-blue-400 text-white rounded mb-5 px-5 py-1">
            Create
          </button>
        </Link>
        <Input
          variant="filled"
          placeholder="Search"
          value={searchTerms}
          onChange={(e) => dispatch(setSearchTerms(e.target.value))}
        ></Input>
      </div>

      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </Table>
    </div>
  );
};

export default ContactTable;
