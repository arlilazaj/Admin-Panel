import axios from "axios";

const authToken = JSON.parse(localStorage.getItem("token")!);

export interface FetchResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: T[];
}
export interface DeleteResponse {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: null;
}
const axiosInstance = axios.create({
  baseURL: "http://localhost:5049/api",
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
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
  delete = (id: number | string) => {
    return axiosInstance
      .delete<DeleteResponse>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  create = (data: T) => {
    return axiosInstance
      .post<FetchResponse<T>>(this.endpoint, data)
      .then((res) => res.data);
  };
  edit = (id: number | string, updatedData: T) => {
    return axiosInstance.put<DeleteResponse>(
      this.endpoint + "/" + id,
      updatedData
    );
  };
}
export default APIClient;
