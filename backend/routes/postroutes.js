import express from "express";
import {isLoggedIn} from "../middlewares/isLoggedIn.js"
import upload from "../middlewares/uploadimage.js"
import {createpost,getuserposts,getallposts,deletepost,likepost} from "../controllers/postcontroller.js"

const router=express.Router();

router.post("/createpost",isLoggedIn,upload.single("image"),createpost);
router.get("/getuserposts/:id",isLoggedIn,getuserposts);
router.get("/getallposts/:id",isLoggedIn,getallposts);
router.delete("/deletepost/:id",isLoggedIn,deletepost);
router.put("/likepost/:id",isLoggedIn,likepost);

export default router;