import express from "express";
import DomesticGuestsController from "../controllers/domestic-guests-controller.js";
import Auth from '../middleware/is-auth.js'
const domesticGuestsController = new DomesticGuestsController();
const router = express.Router();
const auth = new Auth();

router.post("/adddomesticguests", auth.checkLogin, auth.checkPerson, domesticGuestsController.addDeclaration);
router.get("/getdomesticquest", auth.checkLogin, auth.checkPerson, domesticGuestsController.checkDeclaration, domesticGuestsController.getDeclaration);
router.delete("/deletedomesticguest", auth.checkLogin, auth.checkPerson, domesticGuestsController.checkDeclaration,domesticGuestsController.deleteDeclaration);

export default router;