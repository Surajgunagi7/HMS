import { Router } from "express";

import { 
    loginUser,
    registerUser,
    logoutUser,
    refreshAccessToken,
    updateAccountDetails,
    getUserProfile, 
    deleteUser,
    getUsersByRole     
} from "../controllers/user.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'
const router = Router();
import {upload} from "../middlewares/multer.middleware.js";


router.post("/register",upload.single("profilePicture") ,registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT,logoutUser);
router.post("/refresh-token",refreshAccessToken)
router.patch("/update", verifyJWT,updateAccountDetails);
router.get("/profile", verifyJWT,getUserProfile);
router.delete("/delete/:loginId",verifyJWT, deleteUser);
router.get("/get-users-by-role/:role", getUsersByRole);

export default router;