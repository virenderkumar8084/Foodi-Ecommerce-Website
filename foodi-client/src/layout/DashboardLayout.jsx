import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import {
  FaCartShopping,
  FaLocationArrow,
  FaRegUser,
  FaUsers,
} from "react-icons/fa6";
import { FaQuestionCircle, FaShoppingBag } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import logo from "/logo.png";
import useAdmin from "../hooks/useAdmin";
// import useAuth from "../hooks/useAuth";
// import Login from "../components/Login";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdSpaceDashboard />
        Home{" "}
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li>
      <Link to="/dashboard">
        <FaLocationArrow />
        Order Tracking
      </Link>
    </li>
    <li>
      <Link to="/dashboard">
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>
      {isAdmin ? (
        <div>
          <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-3">
              {/* Page content here */}
              <div className="flex items-center justify-between mx-4">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button lg:hidden"
                >
                  <MdDashboardCustomize />
                </label>
                <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
                  <FaRegUser />
                  Log Out
                </button>
              </div>
              <div className="mt-5 md:mt-2 mx-4">
                <Outlet></Outlet>
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li>
                  <Link to="/dashboard">
                    <img src={logo} alt="" className="w-20" />
                    <span>
                      <div className="badge badge-accent">Admin</div>
                    </span>
                  </Link>
                </li>
                <hr />
                {/* Sidebar content here */}
                <li className="mt-4">
                  <Link to="/dashboard">
                    <MdSpaceDashboard />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaShoppingBag />
                    Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/add-menu">
                    <IoIosAddCircle />
                    Add Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-items">
                    <MdEditSquare />
                    Manage Items
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/dashboard/users">
                    <FaUsers />
                    All Users
                  </Link>
                </li>
                <hr />
                {/* nav shared links */}
                {sharedLinks}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Link to="/">
            <button className="btn bg-green text-white">Back to Home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

// Bug resolve
// loading ? (
//   <Login />
// )
