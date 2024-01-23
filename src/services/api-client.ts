import axios from "axios";

export interface FetchRespnse<T> {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: [];
  results: T[];
}
const axiosInstance = axios.create({
  baseURL: "http://localhost:5049/api",
});
class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance
      .get<FetchRespnse<T>>(this.endpoint)
      .then((res) => res.data);
  };
}
export default APIClient;
