import express from "express";
import MoveDeclarationController from "../controllers/move-declaration-controllers.js";
import Auth from '../middleware/is-auth.js'
const moveDeclarationController = new MoveDeclarationController();
const router = express.Router();
const auth = new Auth();

router.post("/addmovedeclaration", auth.checkLogin, auth.checkPerson, moveDeclarationController.addDeclaration);
router.get("/getmovedeclaration", auth.checkLogin, auth.checkPerson, moveDeclarationController.checkDeclaration, moveDeclarationController.getDeclaration);
router.delete("/deletemovedeclaration", auth.checkLogin, auth.checkPerson, moveDeclarationController.checkDeclaration,moveDeclarationController.deleteDeclaration);

export default router;