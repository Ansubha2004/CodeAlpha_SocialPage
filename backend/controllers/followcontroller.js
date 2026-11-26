import followmodel from "../models/followmodel.js";
import usermodel from "../models/usermodel.js";

export const followuser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.id === id) {
            return res.json({
                success: false,
                message: "You cannot follow yourself",
            });
        }
        const user = await usermodel.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const existingfollow = await followmodel.findOne({
            follower: req.user.id,
            following: id,
        });

        if (existingfollow) {
            return res.json({
                success: false,
                message: "Already following this user",
            });
        }
        await followmodel.create({
            follower: req.user.id,
            following: id,
        });

        return res.json({
            success: true,
            message: "User followed successfully",
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Failed to follow",
            error
        })
    }
}   

export const unfollowuser=async (req,res)=>{
    try{
        const {id}=req.params;
        const unfollow=await followmodel.findOneAndDelete({
            follower:req.user.id,
            following:id
        });
        if (!unfollow) {
            return res.json({
              success: false,
              message: "You are not following this user",
            });
          }
      
          return res.json({
            success: true,
            message: "User unfollowed successfully",
          });
    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Failed to unfollow",
            error
        })
    }
}

export const getfollowers=async (req,res)=>{
    try
    {
        const {id}=req.params;
        const followers=await followmodel.find({
            following:id
        }).populate("follower","-password -imageId");
        return res.json({
            success: true,
            message:"followers retrienved",
            followers,
          });
    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Failed to get followers",
            error
        })
    }
}
export const getfollowings=async (req,res)=>{
    try
    {
        const {id}=req.params;
        const followings=await followmodel.find({
            follower:id
        }).populate("following","-password -imageId");
        return res.json({
            success: true,
            message:"followings retrienved",
            followings,
          });
    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Failed to get followings",
            error
        })
    }
}