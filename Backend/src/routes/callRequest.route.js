import { Router } from "express";
import {
  createCallRequest,
  getCallRequests,
  attendCallRequest
} from "../controllers/callRequest.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; 

const router = Router();

router.post("/create-call-request", createCallRequest);

router.get("/get-call-requests", verifyJWT, getCallRequests);
router.patch("/attend-call-request/:id", verifyJWT, attendCallRequest);

export default router;
