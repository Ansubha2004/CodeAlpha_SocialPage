import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Home({ user, url }) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getallposts = async () => {
    try {
      const result = await axios.get(`${url}/postapi/getallposts/${user._id}`, {
        withCredentials: true,
      });
      if (result.data.success) {
        console.log(result.data.posts);
        setPosts(result.data.posts);
      }
    } catch (error) {
      console.log(error, "Error fetching all posts");
      return;
    }
  };

  const openProfile = (id) => {
    user._id === id ? navigate("/profile") : navigate(`/profile/${id}`);
    setSearch("");
    setUsers([]);
  };
  const location = useLocation();
  const searchRef = useRef(null);

  const handlefollow = async (id) => {
    try {
      const result = await axios.post(
        `${url}/followapi/follow/${id}`,
        {},
        { withCredentials: true },
      );
      if (result.data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.user._id === id
              ? { ...post, isFollowing: true }
              : post
          )
        );
      }
    } catch (error) {
      console.log("Follow request failed ", error);
      return;
    }
  };


  useEffect(() => {
    if (location.state?.focusSearch) {
      searchRef.current?.focus();
      window.history.replaceState({}, document.title);
    }
    getallposts();
  }, [location]);

  const handlesearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    try {
      const result = await axios.get(`${url}/authapi/searchuser`, {
        params: { search: value },
        withCredentials: true,
      });

      if (result.data.success) {
        setUsers(result.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <section
      id="Home"
      className="flex relative flex-col items-center p-5 pt-0 pb-10 min-h-screen bg-[#fafbff]"
    >
      <div className="sticky top-0 z-50 w-full bg-[#fafbff] px-5 py-7">
        <div className="flex items-center gap-3 bg-[#f0f1f8] px-5 py-3 rounded-2xl w-full shadow-sm">
          <Search size={22} className="text-gray-500" />

          <input
            type="text"
            ref={searchRef}
            value={search}
            onChange={handlesearch}
            placeholder="Search users..."
            className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>
        {/* Search results */}
        {search.trim() && (
          <div className="absolute left-5 right-5 top-[85%] bg-white rounded-xl shadow-lg border border-gray-100 max-h-80 overflow-y-auto">
            {users.length > 0 ? (
              users.map((item) => (
                <div
                  key={item._id}
                  onClick={() => openProfile(item._id)}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
                >
                  <img
                    src={
                      item.profileimage ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Profile"
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">
                      {item.username}
                    </h3>
                    <p className="text-sm text-gray-500">{item.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-gray-500 text-center">
                No users found
              </p>
            )}
          </div>
        )}
      </div>
      <div className="w-full grid grid-cols-2 gap-5 ">
        {posts.map((post, index) => (
          <div className="bg-white w-full rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    post.user.profileimage ||
                    "https://lovemine.in/wp-content/uploads/2024/05/no-dp_16-300x300.webp"
                  }
                  alt="User"
                  className="w-13 h-13 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {post.user.username}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {getTimeAgo(post.createdAt)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => post.user._id !== user._id?post.isFollowing?navigate(`/profile/${post.user._id}`):handlefollow(post.user._id):navigate("/profile")}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                  post.user._id === user._id || post.isFollowing
                    ? "bg-gray-100 text-gray-700  hover:bg-gray-200"
                    : " bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                }`}
              >
                {post.user._id === user._id || post.isFollowing
                  ? "View Profile"
                  : "Follow"}
              </button>
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
                <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition">
                  <Heart size={27} strokeWidth={2} />
                  <span className="text-sm font-medium">124</span>
                </button>
                <button className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition">
                  <MessageCircle size={27} strokeWidth={2} />
                  <span className="text-sm font-medium">23</span>
                </button>
              </div>
              <div
                className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                  post.user._id !== user._id
                    ? post.isFollowing
                      ? "bg-green-50 text-green-600 border border-green-100"
                      : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                    : "bg-orange-50 text-orange-600 border border-orange-100"
                }`}
              >
                {post.user._id !== user._id
                  ? post.isFollowing
                    ? "Account Followed"
                    : "Suggested"
                  : "Your Post"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
