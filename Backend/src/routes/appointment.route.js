import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointment
} from "../controllers/appointment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", createAppointment);
router.get("/get-appointments",verifyJWT, getAppointments);
router.put("/update-appointments/:id",verifyJWT, updateAppointment);
router.delete("/delete-appointments/:id",verifyJWT, deleteAppointment);

export default router;
