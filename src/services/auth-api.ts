import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5049/api",
});
class APIauth {
  login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post("/UserAuth/Login", {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      throw new Error("Authentication failed");
    }
  };
  extractRoleFromJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
}
export default new APIauth();
