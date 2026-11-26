import express from "express";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
import { authsignupValidation, authloginValidation } from "../middlewares/authValidation.js"
import {register,login,logout,profile,updateprofile} from "../controllers/authcontroller.js";
import upload from "../middlewares/uploadimage.js"

const router=express.Router();


router.post("/register",authsignupValidation,register);
router.post("/login",authloginValidation,login);
router.get("/logout",logout);
router.get("/profile",isLoggedIn,profile);
router.put("/editprofile",isLoggedIn,upload.single("profileimage"),updateprofile);


export default router;