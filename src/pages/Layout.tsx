import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="w-screen ">
      <div className="grid grid-cols-3 sm:grid-cols-4 w-full">
        <SideBar />
        <div className="col-span-2 sm:col-span-3 pt-10 mt-20 bg-gray-200  h-[99%]">
          <Outlet />

          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Layout;
