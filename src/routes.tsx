import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Users from "./components/Users";
import Product from "./components/Product";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        { path: "users", element: <Users /> },
        {path:'products',element:<Product/>}
],
  },
]);

export default routes;
