import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointment
} from "../controllers/appointment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/create", createAppointment);
router.get("/get-appointments", getAppointments);
router.put("/update-appointments/:id", updateAppointment);
router.delete("/delete-appointments/:id", deleteAppointment);

export default router;
