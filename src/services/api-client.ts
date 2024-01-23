import axios from "axios";

export interface FetchResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: T[];
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
      .get<FetchResponse<T>>(this.endpoint)
      .then((res) => res.data);
  };
}
export default APIClient;
