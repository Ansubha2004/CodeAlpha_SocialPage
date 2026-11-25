import React, { useState } from "react";
import { Mail, LockKeyhole, UserRound, AtSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ refreshUser}) {
  const navigate = useNavigate();
  const url=import.meta.env.VITE_API_URL;

  const [formdata, setFormdata] = useState({
    name: "",
    username: "",
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
    console.log(formdata,"hdbhejheb")
    const {name,username,email,password}=formdata;
    try{
        const result =await axios.post(`${url}/authapi/register`,formdata,{withCredentials:true});
        if(result.data.success)
        { 
            console.log(formdata)
            setFormdata(
                {
                    name: "",
                    username: "",
                    email: "",
                    password: "",
                  }
            );
            await refreshUser();
            alert(result.data.message);
            navigate("/login");
        }
    }
    catch(error)
    {
        alert(error.response.data.message);
        return;
    }
  };

  return (
    <section
      id="register"
      className="min-h-screen w-full flex items-center justify-center bg-[#fafbff] px-4 py-4"
    >
      <div className="w-full max-w-[420px] bg-white rounded-2xl px-7 py-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <h1 className="text-xl font-bold text-gray-900">Picsyfi</h1>
        </div>
        <h2 className="text-lg font-bold text-gray-800 text-center mb-1">
          Welcome To Picsyfi!
        </h2>

        <p className="text-xs text-gray-500 text-center mb-5">
          Create your account and connect with everyone.
        </p>
        <form onSubmit={handlesubmit} className="flex flex-col gap-3">
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-indigo-500 transition">
            <UserRound size={18} className="text-gray-500 shrink-0" />
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handlechange}
              placeholder="Enter Your Name"
              required
              className="w-full outline-none text-sm text-gray-700 bg-transparent"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-indigo-500 transition">
            <AtSign size={18} className="text-gray-500 shrink-0" />
            <input
              type="text"
              name="username"
              value={formdata.username}
              onChange={handlechange}
              placeholder="Choose a Username"
              required
              className="w-full outline-none text-sm text-gray-700 bg-transparent"
            />
          </div>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-indigo-500 transition">
            <Mail size={18} className="text-gray-500 shrink-0" />
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
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-indigo-500 transition">
            <LockKeyhole size={18} className="text-gray-500 shrink-0" />
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              placeholder="Password"
              minLength={8}
              maxLength={30}
              required
              className="w-full outline-none text-sm text-gray-700 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 mt-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md shadow-indigo-200 hover:opacity-90 transition-all"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 mt-5">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="ml-1 text-indigo-600 font-semibold hover:underline"
          >
            Login Here
          </button>
        </p>
      </div>
    </section>
  );
}

export default Register;
