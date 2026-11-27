import postmodel from "../models/postmodel.js";
import usermodel from "../models/usermodel.js";
import cloudinary from "../config/cloudinary.js";
import followmodel from "../models/followmodel.js";


export const createpost = async (req, res) => {
    try {
        const { caption } = req.body;
        if (!req.file) {
            return res.json({
                success: false,
                message: "Image required"
            })
        }
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: "post_folder"
        });
        const post = await postmodel.create({
            user: req.user.id,
            image: result.secure_url,
            imageId: result.public_id,
            caption: caption || "",
        });

        return res.json({
            success: true,
            message: "Post created successfully",
            post
        });

    }
    catch (error) {
        return res.json({
            success: false,
            message: "Failed to create post",
            error
        })
    }
}


export const getuserposts = async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await postmodel.find({ user: id }).populate("user", "-password -imageId -email").sort({ createdAt: -1 });
        return res.json({
            success: true,
            message: "fetched all post of user",
            posts
        });

    }
    catch (error) {
        return res.json({
            success: false,
            message: "Error getting user posts",
            error
        });
    }
}

export const getallposts = async (req, res) => {
  try {
    const userid = req.user.id;
    const followings = await followmodel
      .find({ follower: userid })
      .select("following");

    const followingids = new Set(
      followings.map((item) => item.following.toString())
    );
    const posts = await postmodel
      .find()
      .populate("user", "-password -imageId")
      .populate("comments.user", "username profileimage")
      .sort({ createdAt: -1 });

    const updatedPosts = posts.map((post) => ({
      ...post.toObject(),
      isFollowing: post.user
        ? followingids.has(post.user._id.toString())
        : false,
    }));

    return res.json({
      success: true,
      message: "Fetched all posts",
      posts: updatedPosts,
    });

  } catch (error) {
    return res.json({
      success: false,
      message: "Failed to fetch all posts",
      error: error.message,
    });
  }
};

export const deletepost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postmodel.findById(id);
    if (!post) {
      return res.json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.user.toString() !== req.user.id) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }
    await postmodel.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};


export const likepost=async (req,res)=>{
  try{
    const {id}=req.params;
    const userid=req.user.id;
    const post=await postmodel.findById(id);
    if(!post)
    {
      return res.json({
        success: false,
        message: "Post not found",
      });
    }

    const existinglike=post.likes.includes(userid);
    if (existinglike) {
      post.likes.pull(userid);
    } else {
      post.likes.push(userid);
    }

    await post.save();

    return res.json({
      success:true,
      message:existinglike?"Post Unliked":"Post Liked",
      likes:post.likes,
      isLiked:!!existinglike
    })
  }
  catch(error)
  {
    return res.json({
      success:false,
      message:"Lik post api issue",
      error:error.message
    })
  }
}
