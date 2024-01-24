import { MdDashboard } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="h-screen overflow-hidden w-full">
      <h1 className="text-black text-sm sm:text-md md:text-2xl font-sans font-bold pl-2 py-5 ">
        Admin
      </h1>

      <aside className="flex flex-col bg-black w-full rounded-lg h-full pl-2 gap-2 pt-2 ">
        <div className="flex items-center place-items-center pl-2 hover:bg-red-700">
          <MdDashboard className="text-white text-sm sm:text-md md:text-2xl mr-2" />
          <Link to={"/"} className="text-white text-sm sm:text-md md:text-2xl">
            Dashboard
          </Link>
        </div>
        <div className="flex items-center pl-2 hover:bg-red-700">
          <MdProductionQuantityLimits className="text-white text-sm sm:text-md md:text-2xl mr-2" />
          <Link
            to={"products"}
            className="text-white text-sm sm:text-md md:text-2xl "
          >
            Products
          </Link>
        </div>
        <div className="flex items-center pl-2 hover:bg-red-700">
          <TbCategoryFilled className="text-white text-sm sm:text-md md:text-2xl mr-2" />
          <Link to={"/"} className="text-white text-sm sm:text-md md:text-2xl">
            Categories
          </Link>
        </div>
        <div className="flex items-center pl-2 hover:bg-red-700">
          <FaUserFriends className="text-white text-sm sm:text-md md:text-2xl mr-2" />
          <Link
            to={"/users"}
            className="text-white text-sm sm:text-md md:text-2xl"
          >
            Users
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
