import { useMutation, useQueryClient } from "react-query";
import { Users } from "../entities/User";
import APIClient from "../services/api-client";
import toast from "react-hot-toast";

const apiClient = new APIClient<Users>("/User/deleteUser");

const useDeleteUsers = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.delete(userId),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("Successfully deleted");
    },
  });
};

export default useDeleteUsers;
