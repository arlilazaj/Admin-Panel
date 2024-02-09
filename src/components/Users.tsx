import useUsers from "../UserHooks/useUsers";
import UsersTable from "./UsersTable";

const Users = () => {
  const { data, error } = useUsers();

  if (error || !data) return null;

  return (
    <>
      <UsersTable users={data?.result} />
    </>
  );
};

export default Users;
