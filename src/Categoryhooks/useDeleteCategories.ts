import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { Category } from "../entities/Category";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Category>("/CategoryApi");

const useDeleteCategories = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.delete(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success("Successfully deleted");
    },
  });
};
export default useDeleteCategories;
