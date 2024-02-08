import { useQuery } from "react-query";
import APIClient from "../services/api-client";
import { Category } from "../entities/Category";

const apiClient = new APIClient<Category>("/CategoryApi/getCategory");

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: apiClient.getAll,
  });

export default useCategories;
