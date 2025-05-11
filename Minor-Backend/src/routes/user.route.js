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


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT,logoutUser);
router.post("/refresh-token",refreshAccessToken)
router.patch("/update", verifyJWT,updateAccountDetails);
router.get("/profile", verifyJWT,getUserProfile);
router.delete("/delete/:loginId",verifyJWT, deleteUser);
router.get("/get-users-by-role/:role",verifyJWT, getUsersByRole);

export default router;