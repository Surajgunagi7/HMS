import { Router } from "express";
import { 
    createOrFindPatient,
    searchPatient,
    getAllPatients,
    updatePatient,
    deletePatient,
    addVisitToPatient,
    getPatientVisits,
    updateVisitPayment,
    getPendingPayments,
    recordPayment
} from "../controllers/patient.controller.js";

const router = Router();

// Existing routes
router.post("/create-or-find-patient", createOrFindPatient);
router.get("/searchPatient", searchPatient);
router.post("/updatePatient/:id", updatePatient);
router.post("/addVisitToPatient/:id", addVisitToPatient);
router.get("/getAllPatient", getAllPatients);
router.delete("/deletePatient/:id", deletePatient);

// New routes for visit and payment management
router.get("/:patientId/visits", getPatientVisits);
router.put("/:patientId/visits/:visitId/payment", updateVisitPayment);
router.get("/:patientId/pending-payments", getPendingPayments);
router.post("/:patientId/visits/:visitId/record-payment", recordPayment);

export default router;