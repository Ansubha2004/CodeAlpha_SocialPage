import express from "express";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
import { authsignupValidation, authloginValidation } from "../middlewares/authValidation.js"
import {register,login,logout,profile} from "../controllers/authcontroller.js";


const router=express.Router();


router.post("/register",authsignupValidation,register);
router.post("/login",authloginValidation,login);
router.get("/logout",logout);
router.get("/profile",isLoggedIn,profile);


export default router;