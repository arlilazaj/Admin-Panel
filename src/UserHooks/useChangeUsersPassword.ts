import { useMutation, useQueryClient } from "react-query";
import APIClient from "../services/api-client";
import toast from "react-hot-toast";
import { UsersPassword } from "../entities/UsersPassword";

const apiClient = new APIClient<UsersPassword>("/User/UpdateUserPassword");
const useChangeUsersPassword = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UsersPassword) => apiClient.edit(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("Successfully changed");
    },
  });
};

export default useChangeUsersPassword;
