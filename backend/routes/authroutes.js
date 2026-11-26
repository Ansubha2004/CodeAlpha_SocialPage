import express from "express";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
import { authsignupValidation, authloginValidation } from "../middlewares/authValidation.js"
import {register,login,logout,profile,updateprofile,searchuser,getuserprofile} from "../controllers/authcontroller.js";
import upload from "../middlewares/uploadimage.js"

const router=express.Router();


router.post("/register",authsignupValidation,register);
router.post("/login",authloginValidation,login);
router.get("/logout",logout);
router.get("/profile",isLoggedIn,profile);
router.put("/editprofile",isLoggedIn,upload.single("profileimage"),updateprofile);

//searchuser
router.get("/searchuser",isLoggedIn,searchuser);
router.get("/profile/:id",isLoggedIn,getuserprofile);


export default router;