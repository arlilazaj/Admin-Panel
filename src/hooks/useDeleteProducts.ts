import { useMutation, useQueryClient } from "react-query";
import APIClient from "../services/api-client";
import { Products } from "../entities/Products";

const apiClient = new APIClient<Products>("/ProductApi");
const useDeleteProducts = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: () => apiClient.delete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
};

export default useDeleteProducts;
