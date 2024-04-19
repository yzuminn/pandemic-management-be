import express from "express";
import ListDeclarationController from "../controllers/list-declaration-controllers.js";
import Auth from '../middleware/is-auth.js'
const listDeclarationController = new ListDeclarationController();
const router = express.Router();
const auth = new Auth();

router.get("/getlistdomesticquest", auth.checkLogin, auth.checkAdminOrMedical, listDeclarationController.getListDomesticGuests);
router.get("/getlistentrydeclaration", auth.checkLogin, auth.checkAdminOrMedical, listDeclarationController.getListEntryDeclaration);
router.get("/getlistmovedeclaration", auth.checkLogin, auth.checkAdminOrMedical, listDeclarationController.getListMoveDeclaration);

export default router;