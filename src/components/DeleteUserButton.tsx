import useDeleteUsers from "../UserHooks/useDeleteUsers";

const DeleteUserButton = (props: { id: string }) => {
  const deleteUser = useDeleteUsers(props.id);
  return (
    <button
      onClick={async () => await deleteUser.mutateAsync()}
      className="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      Delete
    </button>
  );
};

export default DeleteUserButton;
