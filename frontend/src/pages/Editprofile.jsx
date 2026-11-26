import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Editprofile({ user, url ,setUser }) {
  const navigate=useNavigate();
  const [editformdata, seteditformdata] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    profileimage: null,
  });
  const [preview,setPreview]=useState(user?.profileimage || "https://lovemine.in/wp-content/uploads/2024/05/no-dp_16-300x300.webp");
  const handleChange=(e)=>{
    const {name,value,type,files}=e.target;
    const shallowcopy={...editformdata};
    shallowcopy[name]=type==="file"?files[0]:value;
    seteditformdata(shallowcopy);
    if(type==="file" && files?.[0])
      setPreview(URL.createObjectURL(files[0]));
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    const {username,bio,profileimage}=editformdata;
    try{
      const formdata=new FormData();
      formdata.append("username",username);
      formdata.append("bio",bio)
      if(profileimage instanceof File)
        formdata.append("profileimage",profileimage);
      

      const result=await axios.put(`${url}/authapi/editprofile`,formdata,{withCredentials:true});
      if (result.data.success) {
        alert("Profile updated successfully!");
        setUser(result.data.user);
        navigate("/profile");
      }

    }
    catch(error)
    {
      console.log(error);
      alert("Failed to edit profile");
      return ;
    }
  };

  return (
    <section
      id="editprofile"
      className="min-h-screen flex items-center w-full bg-[#fafbff] px-4 py-6 sm:px-8"
    >
      <div className="w-full mx-auto max-w-3xl">
        <p className="text-3xl mb-6 text-center font-bold text-gray-900">
          Edit Profile
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
            <div className="flex flex-col items-center w-50">
              <img
                src={
                  preview
                }
                alt="Profile"
                className="w-full aspect-[1/1] rounded-full object-cover"
              />
              <label
                htmlFor="profilephoto"
                className="mt-3 cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Change Photo
              </label>

              <input
                type="file"
                id="profilephoto"
                name="profileimage"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={editformdata.username}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={editformdata.bio}
                  onChange={handleChange}
                  rows="5"
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Write something about yourself"
                />
              </div>
              <button
                type="submit"
                className="mt-1 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Editprofile;
