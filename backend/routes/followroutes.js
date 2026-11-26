import express from "express";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
import { followuser,unfollowuser,getfollowers,getfollowings } from "../controllers/followcontroller.js";

const router=express.Router();

router.post("/follow/:id",isLoggedIn,followuser);
router.delete("/unfollow/:id", isLoggedIn, unfollowuser);
router.get("/getfollowers/:id",isLoggedIn,getfollowers);
router.get("/getfollowings/:id",isLoggedIn,getfollowings);

export default router;