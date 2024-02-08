import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";
import APIClient from "../services/api-client";
import { CreateCategory } from "../entities/CreateCategory";

const apiClient = new APIClient<CreateCategory>("CategoryApi");
const useCreateCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategory) => apiClient.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success("Successfully created");
    },
  });
};
export default useCreateCategories;
