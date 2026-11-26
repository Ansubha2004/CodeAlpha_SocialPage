import React,{useState,useEffect,useRef} from "react";
import {
  Search,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import {useNavigate,useLocation} from "react-router-dom";
import axios from "axios";

function Home({user,url}) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const openProfile = (id) => {
    user._id===id?navigate("/profile"):navigate(`/profile/${id}`);
    setSearch("");
    setUsers([]);
  };
  const location = useLocation();
const searchRef = useRef(null);

  useEffect(() => {
    if (location.state?.focusSearch) {
      searchRef.current?.focus();
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  
  const handlesearch=async (e)=>{
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
  }
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
                    <p className="text-sm text-gray-500">
                      {item.name}
                    </p>
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
        {[1, 2,3,4,5].map((post, index) => (
          <div className="bg-white w-full rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=47"
                  alt="User"
                  className="w-13 h-13 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    johndoe
                  </h3>
                  <p className="text-sm text-gray-500">2h ago</p>
                </div>
              </div>

              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <MoreHorizontal size={23} />
              </button>
            </div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200"
                alt="Sunset"
                className="w-full h-[260px] md:h-[350px] object-cover"
              />
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
              <button className="text-gray-700 hover:text-indigo-600 transition">
                <Bookmark size={27} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
