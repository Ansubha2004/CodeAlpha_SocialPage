import React, { useState, useEffect } from "react";
import { Camera,Heart,MessageCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UserProfile({ user, url }) {
  const navigate = useNavigate();
  const [posts,setPosts]=useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profile, setProfile] = useState(null);

  
  const fetchposts=async (id)=>{
    try{
      const result=await axios.get(`${url}/postapi/getuserposts/${id}`,{withCredentials:true});
      if(result.data.success)
      {
        setPosts(result.data.posts);
      }
    }
    catch(error)
    {
      console.log(error,"Failed to fetch acc posts");
      return;
    }
  }

  const fetchfollowerdata = async (id) => {
    try {
      const followerresult = await axios.get(
        `${url}/followapi/getfollowers/${id}`,
        { withCredentials: true },
      );
      const followingresult = await axios.get(
        `${url}/followapi/getfollowings/${id}`,
        { withCredentials: true },
      );
      if (followerresult.data.success) {
        setFollowers(followerresult.data.followers);
      }

      if (followingresult.data.success) {
        setFollowings(followingresult.data.followings);
      }
    } catch (error) {
      console.log("Error fetching followers followings,", error);
      return;
    }
  };

  const handlefollow = async () => {
    try {
      const result = await axios.post(
        `${url}/followapi/follow/${profile._id}`,
        {},
        { withCredentials: true },
      );
      if (result.data.success) {
        setIsFollowing(true);
        await fetchfollowerdata(profile._id);
      }
    } catch (error) {
      console.log("Follow request failed ", error);
      return;
    }
  };


  const handleunfollow = async () => {
    try {
      const result = await axios.delete(
        `${url}/followapi/unfollow/${profile._id}`,
        { withCredentials: true },
      );
      if (result.data.success) {
        setIsFollowing(false);
        await fetchfollowerdata(profile._id);
      }
    } catch (error) {
      console.log("UnFollow request failed ", error);
      return;
    }
  };
  const checkfollow = async (id) => {
    try {
      const result = await axios.get(
        `${url}/followapi/checkfollow/${id}`,
        { withCredentials: true }
      );
  
      if (result.data.success) {
        setIsFollowing(result.data.isFollowing);
      }
    } catch (error) {
      console.log("Check follow error:", error);
    }
  };

  const { id } = useParams();
  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const result = await axios.get(`${url}/authapi/profile/${id}`, {
          withCredentials: true,
        });

        if (result.data.success) {
          setProfile(result.data.user);
          await fetchfollowerdata(result.data.user._id);
          await  checkfollow(result.data.user._id);
          await fetchposts(result.data.user._id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchprofile();
  }, [id, url]);
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(months / 12);
    return `${years}y ago`;
  };
  const likepost = async (id) => {
    try {
      const result = await axios.put(
        `${url}/postapi/likepost/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      if (result.data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id ? { ...post, likes: result.data.likes } : post,
          ),
        );
      }
    } catch (error) {
      console.log("Error in Like or dislke", error);
      return;
    }
  };


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

              <button
                onClick={isFollowing ? handleunfollow : handlefollow}
                className={`min-w-[110px] rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  isFollowing
                    ? "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>

            <div className="mt-3 flex gap-40 text-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{posts.length}</h3>
                <p className="text-sm text-gray-500">Posts</p>
              </div>

              <div className="cursor-pointer" onClick={()=>navigate(`/followerpage/${profile._id}?tab=follower`)}>
                <h3 className="text-lg font-bold text-gray-900">
                  {followers.length}
                </h3>
                <p className="text-sm text-gray-500">Followers</p>
              </div>

              <div className="cursor-pointer" onClick={()=>navigate(`/followerpage/${profile._id}?tab=following`)}>
                <h3 className="text-lg font-bold text-gray-900">
                  {followings.length}
                </h3>
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
            posts.map((post, index) => {
              const isLiked = post.likes.some(
                (id) => id.toString() === user._id.toString(),
              );
              return (
                <div className="bg-white w-full rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-500">
                          {`Posted ${getTimeAgo(post.createdAt)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full overflow-hidden rounded-xl">
                    <img
                      src={post.image}
                      className="w-full h-[260px] md:h-[350px] object-cover"
                    />
                  </div>
                  <div className="px-2 mt-3 flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-semibold uppercase text-gray-400 shrink-0">
                      Caption:
                    </p>
                    <p className="text-sm text-gray-700 break-words">
                      {post.caption}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-8">
                      <button
                        onClick={() => likepost(post._id)}
                        className={`flex items-center gap-2 transition ${
                          isLiked
                            ? "text-red-500"
                            : "text-gray-700 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={27}
                          strokeWidth={2}
                          fill={isLiked ? "currentColor" : "none"}
                        />
                        <span className="text-sm font-medium">
                          {post.likes.length}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition">
                        <MessageCircle size={27} strokeWidth={2} />
                        <span className="text-sm font-medium">
                          {post.comments.length}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
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
