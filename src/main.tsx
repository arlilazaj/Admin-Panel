import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { RouterProvider } from "react-router-dom";
import routes from "./routes.tsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
