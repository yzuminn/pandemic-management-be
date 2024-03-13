import express from "express";
import AccountController from "../controllers/account-controllers.js";
import Auth from '../middleware/is-auth.js'

const accountController = new AccountController();
const router = express.Router();
const auth = new Auth();

router.get("/getListAdmin", auth.checkLogin, auth.checkAdmin, accountController.getAccountAdmin);
router.get("/getListMedical", auth.checkLogin, auth.checkAdmin,accountController.getAccountMedical);
router.put("/accountBrowsing", auth.checkLogin, auth.checkAdmin, accountController.accountBrowsing);

export default router;