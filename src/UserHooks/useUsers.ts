import { useQuery } from "react-query";
import { Users } from "../entities/User";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Users>("/User/getUsers");

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: apiClient.getAll,
  });

export default useUsers;
