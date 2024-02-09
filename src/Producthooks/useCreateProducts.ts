import { useMutation, useQueryClient } from "react-query";
import APIClient from "../services/api-client";
import toast from "react-hot-toast";
import { CreateProduct } from "../entities/CreateProduct";

const apiClient = new APIClient<CreateProduct>("/ProductApi");

const useCreateProducts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProduct) => apiClient.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("Successfully created");
    },
  });
};

export default useCreateProducts;
