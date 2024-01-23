import { useQuery } from "react-query";
import APIClient from "../services/api-client";
import { Products } from "../entities/Products";

const apiClient = new APIClient<Products>("/ProductApi/getProducts");
const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000,
  });

export default useProducts;
