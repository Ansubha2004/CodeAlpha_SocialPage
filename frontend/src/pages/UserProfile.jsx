import React,{useState,useEffect} from "react";
import { Camera } from "lucide-react";
import {useNavigate,useParams} from "react-router-dom";
import axios from "axios";


function UserProfile({ user,url }) {
  const navigate=useNavigate();
  const demoPosts = [
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
  ];

  const posts = demoPosts.map((image, index) => ({
        _id: index,
        image,
      }));

  const followers =  1200;
  const following = 180;
  const [profile, setProfile] = useState(null);


  const { id } = useParams();
  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const result = await axios.get(
          `${url}/authapi/profile/${id}`,
          { withCredentials: true }
        );

        if (result.data.success) {
          setProfile(result.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchprofile();
  }, [id, url]);

  if (!profile) {
    return <p className="p-5">Loading profile...</p>;
  }

  return (
    <section
      id="UserProfile"
      className="min-h-screen w-full bg-[#fafbff] px-4 py-6 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex justify-center sm:justify-start">
            <img
              src={
                profile?.profileimage ||
                "https://lovemine.in/wp-content/uploads/2024/05/no-dp_16-300x300.webp"
              }
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-gray-900">
                {profile.username}
              </h2>

              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                Follow
              </button>
            </div>

            <div className="mt-3 flex gap-40 text-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  { 12}
                </h3>
                <p className="text-sm text-gray-500">Posts</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {followers >= 1000
                    ? (followers / 1000).toFixed(1) + "K"
                    : followers}
                </h3>
                <p className="text-sm text-gray-500">Followers</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">{following}</h3>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 py-2">
          <p className="font-bold">Profile Bio:</p>
          <p className=" text-sm text-gray-600 whitespace-pre-wrap">
            {profile?.bio || "No bio yet."}
          </p>
        </div>
        <p className="px-5 text-2xl my-5 font-bold ">POSTS</p>
        <div className=" grid grid-cols-3 gap-2 sm:gap-3">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={post._id || index}
                className="aspect-square overflow-hidden rounded-lg bg-gray-200"
              >
                <img
                  src={typeof post === "string" ? post : post.image}
                  alt={`Post ${index + 1}`}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-300">
                <Camera size={35} className="text-gray-400" />
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-800">
                No Posts Yet
              </h2>

              <p className="mt-2 text-sm text-gray-500 text-center">
                When you share photos, they'll appear on your profile.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
