import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useSearchParams,useNavigate } from "react-router-dom";

function Follower({user,url}) {
    const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab")==="follower"?"follower":"following");
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  const fetchdata = async () => {
    try {
      const followerresult = await axios.get(
        `${url}/followapi/getfollowers/${id}`,
        { withCredentials: true }
      );
  
      const followingresult = await axios.get(
        `${url}/followapi/getfollowings/${id}`,
        { withCredentials: true }
      );
  
      if (followerresult.data.success && followingresult.data.success) {
        const followerusers = followerresult.data.followers.map(
          (item) => item.follower
        );
  
        const followingusers = followingresult.data.followings.map(
          (item) => item.following
        );
  
        const followingids = followingusers.map((item) => item._id);
  
        setFollowers(
          followerusers.map((item) => ({
            ...item,
            isFollowing: followingids.includes(item._id),
          }))
        );
  
        setFollowings(
          followingusers.map((item) => ({
            ...item,
            isFollowing: true,
          }))
        );
      }
    } catch (error) {
      console.log("Fetch followers error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user?._id) {
      fetchdata();
    }
  }, [user?._id, url]);
  
  const currentUsers =
    activeTab === "followers" ? followers : followings;

  return (
    <section
      id="Follower"
      className="min-h-screen w-full bg-[#fafbff] px-4 py-6 "
    >
      <div className="mx-auto w-[90%]">

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("followers")}
            className={`w-1/2 border-b-2 px-5 py-3 text-sm font-semibold transition ${
              activeTab === "followers"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Followers
          </button>

          <button
            onClick={() => setActiveTab("following")}
            className={`w-1/2 border-b-2 px-5 py-3 text-sm font-semibold transition ${
              activeTab === "following"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Following
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {currentUsers.length > 0 ? (
            currentUsers.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-3 px-3 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={item.profileimage || "https://lovemine.in/wp-content/uploads/2024/05/no-dp_16-300x300.webp"}
                    alt={item.username}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-gray-900">
                      {item.username}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {activeTab === "followers"
                        ? "Follows you"
                        : "Following"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={()=>item._id===user._id?navigate("/profile"):navigate(`/profile/${item._id}`)}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition active:scale-95 border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                    View Account
                </button>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-sm text-gray-500">
              No {activeTab} yet.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default Follower;
