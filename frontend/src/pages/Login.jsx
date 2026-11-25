import React, { useState } from "react";
import { Mail, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({refreshUser}) {
  const navigate = useNavigate();
  const url=import.meta.env.VITE_API_URL;

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const {name,value}=e.target;
    const shallowcopy={...formdata};
    shallowcopy[name]=value;
    setFormdata(shallowcopy);
  };

  const handlesubmit =async (e) => {
    e.preventDefault();
    const {email,password}=formdata;
    try{
        const result=await axios.post(`${url}/authapi/login`,formdata,{withCredentials:true});
        if(result.data.success)
        {
            setFormdata(
                {
                    email: "",
                    password: "",
                  }
            );
            await refreshUser();
        navigate("/");
        alert("Login successful!");
            
            
        }
    }
    catch(error)
    {
        alert(error.response.data.message);
        return ;
    }
  };

  return (
    <section
      id="login"
      className="min-h-screen flex items-center justify-center bg-[#fafbff] p-5"
    >
      <div className="w-full max-w-[500px] bg-white rounded-2xl p-7">
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-bold text-2xl">
            S
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Picsyfi</h1>
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
          Welcome Back!
        </h2>

        <p className="text-sm text-gray-500 text-center mb-7">
          Login to continue to your account
        </p>
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-indigo-500">
            <Mail size={19} className="text-gray-500" />

            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              placeholder="Email Address"
              required
              className="w-full outline-none text-sm text-gray-700 bg-transparent"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-indigo-500">
            <LockKeyhole size={19} className="text-gray-500" />

            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              placeholder="Password"
              required
              className="w-full outline-none text-sm text-gray-700 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md shadow-indigo-200 hover:opacity-90 transition-all"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-7">
          Don't have an account?
          <button
            onClick={() => navigate("/register")}
            className="ml-1 text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </section>
  );
}

export default Login;
