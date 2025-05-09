import { Router } from "express";
import { 
    createPatient,
    searchPatient,
    getAllPatients,
    // getPatientById,
    updatePatient,
    deletePatient   
} from "../controllers/patient.controller.js";
const router = Router();


router.post("/createPatient", createPatient);
router.get("/searchPatient", searchPatient);
router.get("/getAllPatient", getAllPatients);
// router.get("/getPatientById/:id",getPatientById)
router.post("/updatePatient/:id", updatePatient);
router.delete("/deletePatient/:id", deletePatient);

export default router;