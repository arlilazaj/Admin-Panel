import { useMutation, useQueryClient } from "react-query";
import { CreateUser } from "../entities/CreateUser";
import APIClient from "../services/api-client";
import toast from "react-hot-toast";

const apiClient = new APIClient<CreateUser>("/User/Register");

const useCreateUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUser) => apiClient.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("Successfully created");
    },
  });
};
export default useCreateUsers;
