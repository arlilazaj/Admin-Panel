import { useMutation, useQueryClient } from "react-query";
import { Users } from "../entities/User";
import APIClient from "../services/api-client";
import toast from "react-hot-toast";

const apiClient = new APIClient<Users>("/User/UpdateUser");
const useUpdateUsers = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Users) => apiClient.edit(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("Successfully updated");
    },
  });
};

export default useUpdateUsers;
