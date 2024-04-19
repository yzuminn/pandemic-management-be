import express from "express";
import EntryDeclarationController from "../controllers/entry-declaration-controllers.js";
import Auth from '../middleware/is-auth.js'
const entryDeclarationController = new EntryDeclarationController();
const router = express.Router();
const auth = new Auth();

router.post("/addentrydeclaration", auth.checkLogin, auth.checkPerson, entryDeclarationController.addDeclaration);
router.get("/getentrydeclaration", auth.checkLogin, auth.checkPerson, entryDeclarationController.checkDeclaration, entryDeclarationController.getDeclaration);
router.delete("/deleteentrydeclaration", auth.checkLogin, auth.checkPerson, entryDeclarationController.checkDeclaration,entryDeclarationController.deleteDeclaration);

export default router;