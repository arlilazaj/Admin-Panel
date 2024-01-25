import { useMutation, useQueryClient } from "react-query";
import APIClient from "../services/api-client";
import { Products } from "../entities/Products";
import toast from "react-hot-toast";
const apiClient = new APIClient<Products>("/ProductApi");
const useDeleteProducts = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.delete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("Successfully deleted");
    },
  });
};

export default useDeleteProducts;
