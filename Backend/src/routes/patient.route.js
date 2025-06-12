import { Router } from "express";
import { 
    createOrFindPatient,
    searchPatient,
    getAllPatients,
    // getPatientById,
    updatePatient,
    deletePatient   
} from "../controllers/patient.controller.js";
const router = Router();


router.post("/create-or-find-patient", createOrFindPatient);
router.get("/searchPatient", searchPatient);
router.post("/updatePatient/:id", updatePatient);

router.get("/getAllPatient", getAllPatients);
// router.get("/getPatientById/:id",getPatientById)
router.delete("/deletePatient/:id", deletePatient);

export default router;