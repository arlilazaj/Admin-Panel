import { Users } from "../entities/User";
import React, { useState } from "react";
import CreateUser from "./CreateUser";
import DeleteUserButton from "./DeleteUserButton";
import EditUser from "./EditUser";
import ChangePasswordModal from "./ChangePasswordModal";

interface Props {
  users: Users[];
}
const UsersTable = ({ users }: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = useState<null | string>(null);
  const [showEditPassword, setShowEdiPassword] = useState<null | string>(null);
  const findUserById = (userId: string) => {
    return users.find((user) => user.id === userId);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg px-20">
      <div className="grid grid-cols-3 place-content-center mb-5">
        <div></div>
        <h3 className="text-3xl text-center font-bold"> User</h3>
        <button
          onClick={() => setShowModal(true)}
          className="place-self-end text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Create +
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              Username
            </th>

            <th scope="col" className="px-6 py-3 ">
              Email
            </th>
            <th scope="col" className="px-6 py-3 ">
              Actions
            </th>
            <th scope="col" className="px-6 py-3 ">
              Password
            </th>
          </tr>
        </thead>
        <tbody>
          {showModal ? (
            <CreateUser onCancel={(cancel) => setShowModal(cancel)} />
          ) : null}

          {users?.map((user) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={user.id}
            >
              <td className="px-6 py-4">{user.userName}</td>
              <td>{user.email}</td>
              <td className="px-6 py-6 text-right flex">
                <button
                  onClick={() => setShowEditModal(user.id)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-2"
                >
                  Edit
                </button>

                <DeleteUserButton id={user.id} />
              </td>
              <td>
                <button
                  onClick={() => setShowEdiPassword(user.id)}
                  className="font-medium text-orange-400 dark:text-orange-500 hover:underline pr-2"
                >
                  Change Password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <EditUser
          onCancel={() => setShowEditModal(null)}
          selectedUser={findUserById(showEditModal)!}
        />
      )}
      {showEditPassword && (
        <ChangePasswordModal
          onCancel={() => setShowEdiPassword(null)}
          selectedUser={findUserById(showEditPassword)!}
        />
      )}
    </div>
  );
};

export default UsersTable;
