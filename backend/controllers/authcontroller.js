import usermodel from "../models/usermodel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import cloudinary from "../config/cloudinary.js";
dotenv.config();


export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existinguser = await usermodel.findOne({
            $or: [{ email, username }]
        });
        if (existinguser) {
            return res.status(409).json({
                success: false,
                message: "Email or username already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await usermodel.create({
            name,
            username,
            email,
            password: hashedPassword
        });
        return res.json({ success: true, message: "User created successfully", user: newUser });

    }
    catch (error) {
        return res.json({
            success: false,
            message: "Error while creating new User registration",
            error
        })
    }
};

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/"
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const finduser = await usermodel.findOne({ email });
        if (!finduser) {
            return res.json({
                success: false,
                message: "User Not Found - register now"
            })
        }
        const ismatch = await bcrypt.compare(password, finduser.password);
        if (!ismatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({
            id: finduser._id,
            email: finduser.email,
            name: finduser.name,
            username: finduser.username
        }, process.env.JWT_SECRET);
        res.cookie('token', token, cookieOptions)
        return res.json({ success: true, message: "User logged in successfully", user: finduser });

    }
    catch (error) {
        return res.json({
            success: false,
            message: "Login issue",
            error
        })
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Issue in logout",
            error
        })
    }
};

export const profile = async (req, res) => {
    try {
        const user = await usermodel
            .findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });

    }
    catch (error) {
        return res.json({
            success: false,
            message: "Error fetching profile",
            error
        })
    }
};

export const updateprofile = async (req, res) => {
    try {
        const { username, bio } = req.body;
        const user = await usermodel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (username) {
            const existinguser = await usermodel.findOne({
                username: username.toLowerCase().trim(),
                _id: { $ne: req.user.id }
            });

            if (existinguser) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                });
            }

            user.username = username.toLowerCase().trim();
        }
        if (bio !== undefined) {
            user.bio = bio;
        }
        if (req.file) {
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            const result = await cloudinary.uploader.upload(base64Image, {
                folder: "picyfi_profilepic",
            });
            const oldImageId = user.imageId;

            user.profileimage = result.secure_url;
            user.imageId = result.public_id;

            

            if (oldImageId) {
                await cloudinary.uploader.destroy(oldImageId);
            }
        }
        await user.save();
        return res.json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    }
    catch (error) {
        console.error("FULL CLOUDINARY ERROR:");
        console.error(error);
        console.error("Message:", error.message);
        console.error("HTTP Code:", error.http_code);
        console.error("Nested error:", error.error);
    
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message
        });
    }
}

//search user
export const searchuser=async (req,res)=>{
   try{
    const {search}=req.query;
    if (!search || !search.trim()) {
        return res.json({
          success: true,
          message:"No search",
          users: [],
        });
      };
      const users = await usermodel.find({
        $or: [
          { username: { $regex: search.trim(), $options: "i" } },
          { name: { $regex: search.trim(), $options: "i" } }
        ],
      }).select("-password -imageId").limit(30);
      return res.json({
        success: true,
        message:"Found",
        users,
      });
   }
   catch(error)
   {
    return res.json({
        success:false,
        message:"Not found",
        error
    })
   }

}

//get user profile 
export const getuserprofile=async (req,res)=>{
    try{
        const { id } = req.params;

    const user = await usermodel.findById(id)
      .select("-password -imageId");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message:"fetched user detail",
      user,
    });
    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Error fetching user details",
            error
        })
    }
}