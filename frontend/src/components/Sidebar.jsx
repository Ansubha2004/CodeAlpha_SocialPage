
import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  House,
  Search,
  SquarePlus,
  UserRound,
  SquarePen,
  LogOut
} from "lucide-react";

function Sidebar() {

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: House
    },
    {
      name: "Explore",
      path: "/explore",
      icon: Search
    },
    {
      name: "Create",
      path: "/create",
      icon: SquarePlus
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserRound
    },
    {
      name: "Edit Profile",
      path: "/editprofile",
      icon: SquarePen 
    }
  ];

  return (
    <aside className="h-screen w-[220px] bg-white border-r border-gray-200 shadow-sm p-4 flex flex-col">
      <div className="flex items-center gap-2 px-3 py-3 mb-6">
        <div className="bg-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xl">
          P
        </div>
        <h1 className="text-xl font-bold text-indigo-600">
          Picsyfi
        </h1>
      </div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              <Icon size={19} strokeWidth={2.3} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>
      <div className="mt-auto mb-3">

        <NavLink
          to="/login"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;
