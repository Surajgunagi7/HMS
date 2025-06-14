import { Router } from "express";
import { 
    createOrFindPatient,
    searchPatient,
    getAllPatients,
    updatePatient,
    deletePatient,
    addVisitToPatient   
} from "../controllers/patient.controller.js";
const router = Router();


router.post("/create-or-find-patient", createOrFindPatient);
router.get("/searchPatient", searchPatient);
router.post("/updatePatient/:id", updatePatient);
router.post("/addVisitToPatient/:id", addVisitToPatient);
router.get("/getAllPatient", getAllPatients);
router.delete("/deletePatient/:id", deletePatient);

export default router;