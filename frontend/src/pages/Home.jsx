import React from "react";
import {
  Search,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

function Home({user}) {
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
            placeholder="Search users..."
            className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>
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
