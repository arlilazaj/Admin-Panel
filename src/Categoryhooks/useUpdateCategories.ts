import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import APIClient from "../services/api-client";
import { UpdateCategory } from "../entities/UpdateCategory";

const apiClient = new APIClient<UpdateCategory>("/CategoryApi");
const useUpdateCategories = (categoryId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCategory) => apiClient.edit(categoryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success("Successfully updated");
    },
  });
};

export default useUpdateCategories;
