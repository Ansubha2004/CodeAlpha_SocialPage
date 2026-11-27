import React, { useState } from "react";
import { ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Createpost({ user, url }) {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [formdata, setFormdata] = useState({
    image: null,
    caption: "",
  });

  const handlechange = (e) => {
    const { name, value, type, files } = e.target;
    const shallowcopy = { ...formdata };
    shallowcopy[name] = type === "file" ? files[0] : value;
    setFormdata(shallowcopy);
    if (type === "file" && files?.[0])
      setPreview(URL.createObjectURL(files[0]));
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const {image,caption}=formdata;
    try{
        const fdata=new FormData();
        fdata.append("caption",caption);
        if(image instanceof File)
            fdata.append("image",image);
        const result=await axios.post(`${url}/postapi/createpost`,fdata,{withCredentials:true})
        if(result.data.success)
        {
            
            setFormdata({
                image:null,
                caption:""
            });
            navigate("/profile");
            alert("Posted sucessfully");

        }

    }
    catch(error)
    {
        console.log("Error in posting !!",error);
        alert("Error while posting");
        return;
    }
  }

  return (
    <section
      id="createpost"
      className="min-h-screen w-full bg-[#fafbff] px-20 py-6 flex flex-col gap-7 justify-center "
    >
      <p className="font-bold text-2xl  ">CREATE A NEW POST</p>
      <div className=" w-full ">
        <form  onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <label
            htmlFor="postimage"
            className="flex h-52 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-indigo-200 bg-[#fafaff] transition hover:border-indigo-400 hover:bg-indigo-50/40"
          >
            {preview ? (
              <img
                src={preview}
                alt="Post preview"
                className="h-full w-full object-contain"
              />
            ) : (
              <>
                <ImagePlus
                  size={42}
                  strokeWidth={2}
                  className="mb-3 text-indigo-600"
                />
                <p className="text-sm font-semibold text-gray-600">
                  Upload a photo
                </p>
              </>
            )}
          </label>

          <input
            type="file"
            id="postimage"
            name="image"
            onChange={handlechange}
            accept="image/*"
            className="hidden"
            required
          />

          {/* Caption */}
          <div className="mt-4">
            <textarea
              name="caption"
              
              value={formdata.caption}
              onChange={handlechange}
              placeholder="Write a caption..."
              rows={2}
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-700 hover:to-violet-700 active:scale-[0.99]"
          >
            Post
          </button>
        </form>
      </div>
    </section>
  );
}

export default Createpost;
