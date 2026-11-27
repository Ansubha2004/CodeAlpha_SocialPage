import React, { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import axios from "axios";

function CommentBox({ post, user, url, onClose }) {
  const [comments, setComments] = useState(post.comments);
  const [text, setText] = useState("");



  const addcomment = async (e) => {
    e.preventDefault();
    try {
        const result=await axios.post(`${url}/postapi/postcomment/${post._id}`,{text},{withCredentials:true});
        if(result.data.success)
            {
                setComments(result.data.comments);
                setText("");
            }   
    } catch (error) {
      console.log("Error posting comment:", error);
      setText("");
      return ;
    } 
  };

  return (
    <div
      onClick={onClose}
      id="commentbox"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MessageCircle size={21} className="text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Comments
            </h2>
            <span className="text-sm text-gray-400">
              ({comments.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={21} />
          </button>
        </div>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <img
            src={
              post.user.profileimage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {post.user?.username}
            </p>
            <p className="text-xs text-gray-500 line-clamp-1">
              {post.caption}
            </p>
          </div>
          <img src={post.image} className="h-10 rounded-[10px] " />
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 min-h-[200px]">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="flex items-start gap-3"
              >
                <img
                  src={
                    comment.user?.profileimage ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover"
                />

                <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {comment.user.username }
                  </p>

                  <p className="text-sm text-gray-700 break-words mt-1">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <MessageCircle
                size={40}
                className="text-gray-300 mb-3"
              />
              <p className="font-semibold text-gray-700">
                No comments yet
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Be the first to comment!
              </p>
            </div>
          )}
        </div>
        <form
          onSubmit={addcomment}
          className="border-t border-gray-100 p-4 flex items-center gap-3"
        >
          <img
            src={
              user?.profileimage ||"https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Your profile"
            className="w-9 h-9 rounded-full object-cover"
          />

          <input
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder="Write a comment..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="text-indigo-600 hover:text-indigo-800 disabled:text-gray-300 transition"
          >
            <Send size={21} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentBox;
