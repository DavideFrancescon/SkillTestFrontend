import * as React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="m-auto h-[100vh]">
      <div>
        <nav className=" min-h-[5vh] align-center p-8 bg-white">
          <div className="mx-auto flex flex-row w-fit align-center gap-x-20">
            <Link
              to={"/dashboard/home"}
              className="bg-[#f5f5f5] rounded-md h-10 w-16 text-center align-middle align-center"
            >
              Home
            </Link>
            <Link
              to={"/dashboard/table"}
              className="bg-[#f5f5f5] rounded-md h-10 w-16 text-center align-middle align-center"
            >
              Table
            </Link>

            <Link
              to={"/profile"}
              className="bg-[#f5f5f5] rounded-md h-10 w-16 text-center align-middle align-center"
            >
              Profile
            </Link>
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
