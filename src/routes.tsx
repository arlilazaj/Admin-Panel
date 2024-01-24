import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Users from "./components/Users";
import Product from "./components/Product";
import Login from "./components/Login";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/layout", 
    element: <Layout />,
    children: [
      { path: "users", element: <Users /> },
      { path: "products", element: <Product /> },
    ],
  },
]);

export default routes;
