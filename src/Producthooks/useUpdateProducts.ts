import { useMutation, useQueryClient } from "react-query";
import { UpdateProducts } from "../entities/UpdateProduct";
import APIClient from "../services/api-client";
import toast from "react-hot-toast";

const apiClient = new APIClient<UpdateProducts>("/ProductApi");
const useUpdateProducts = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProducts) => apiClient.edit(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("Successfully updated");
    },
  });
};

export default useUpdateProducts;
