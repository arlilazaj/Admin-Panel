import useDeleteProducts from "../hooks/useDeleteProducts";

function DeleteProduct(props: { id: number }) {
  const deleteProduct = useDeleteProducts(props.id);
  return (
    <button
      onClick={async () => await deleteProduct.mutateAsync()}
      className="font-medium text-red-600 dark:text-red-500 hover:underline"
    >
      Delete
    </button>
  );
}

export default DeleteProduct;
