import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  House,
  Search,
  SquarePlus,
  UserRound,
  SquarePen,
  LogOut,
} from "lucide-react";

function Sidebar({user,setUser,url}) {
  const navigate=useNavigate();
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: House,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: Search,
    },
    {
      name: "Create",
      path: "/create",
      icon: SquarePlus,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserRound,
    },
    {
      name: "Edit Profile",
      path: "/editprofile",
      icon: SquarePen,
    },
  ];

  const logout = async () => {
    try {
      const result = await axios.get(`${url}/authapi/logout`, {
        withCredentials: true,
      });

      if (result.data.success) {
        alert("Account logged out");
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.log("Failed to Logout");
      return ;
    }
  };

  if(!user) return;

  return (
    <aside className="h-screen w-[20%] bg-white border-r border-gray-200 shadow-sm p-4 flex flex-col">
      <div className="flex items-center gap-2 px-3 py-3 mb-6">
        <div className="bg-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xl">
          P
        </div>
        <h1 className="text-xl font-bold text-indigo-600">Picsyfi</h1>
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
                    : "text-gray-700 hover:bg-gray-100",
                )
              }
            >
              <Icon size={19} strokeWidth={2.3} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto w-full mb-3">
        <div className="flex items-center gap-1 px- mb-2 min-w-0">
          <img
            src="https://i.pravatar.cc/150?img=47"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm cursor-pointer"
          />

          <div className="flex flex-col min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user.username}
            </p>

            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center w-full gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 outline-none hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
