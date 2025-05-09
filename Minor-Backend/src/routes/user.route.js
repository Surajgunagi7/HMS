import { Router } from "express";
import { 
    loginUser,
    registerUser,
    logoutUser,
    refreshAccessToken,
    updateAccountDetails,
    getUserProfile, 
    deleteUser     
} from "../controllers/user.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'
const router = Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT,logoutUser);
router.post("/refresh-token",refreshAccessToken)
router.post("/update", verifyJWT,updateAccountDetails);
router.get("/profile", verifyJWT,getUserProfile);
router.delete("/delete/:loginId",verifyJWT, deleteUser);

export default router;