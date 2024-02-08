import useDeleteCategories from "../Categoryhooks/useDeleteCategories";

function DeleteCategory(props: { id: number }) {
  const deleteCategories = useDeleteCategories(props.id);
  return (
    <button
      onClick={async () => await deleteCategories.mutateAsync()}
      className="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      Delete
    </button>
  );
}

export default DeleteCategory;
