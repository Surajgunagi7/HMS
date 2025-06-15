import { Router } from "express";
import {
  getDashboardStats,
  getAppointmentAnalytics,
  getPatientAnalytics,
  getRevenueAnalytics,
  getDoctorAnalytics,
  getComprehensiveAnalytics
} from "../controllers/analytics.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(authorizeRoles("admin"));

router.route("/dashboard").get(getDashboardStats);

router.route("/appointments").get(getAppointmentAnalytics);
router.route("/patients").get(getPatientAnalytics);
router.route("/revenue").get(getRevenueAnalytics);
router.route("/doctors").get(getDoctorAnalytics);

router.route("/comprehensive").get(getComprehensiveAnalytics);

export default router;