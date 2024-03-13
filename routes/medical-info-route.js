import express from "express";
import MedicalController from "../controllers/medical-info-controllers.js";
import Auth from '../middleware/is-auth.js'
const medicalController = new MedicalController();
const router = express.Router();
const auth = new Auth();

router.post("/addMedical/", auth.checkLogin,auth.checkMedical, medicalController.addMedical);
router.put("/editMedical/", auth.checkLogin,auth.checkMedical, medicalController.checkMedical,medicalController.editMedical);
router.get("/getMedical/",auth.checkLogin,auth.checkMedical, medicalController.checkMedical, medicalController.getMedical);
router.delete("/deleteMedical/",auth.checkLogin,auth.checkMedical, medicalController.checkMedical,medicalController.deleteMedical);

export default router;