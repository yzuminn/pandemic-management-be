import express from "express";
import AdminController from "../controllers/admin-info-controllers.js";
import Auth from '../middleware/is-auth.js'

const adminController = new AdminController();
const router = express.Router();
const auth = new Auth();

router.get("/getAdmin/",auth.checkLogin,auth.checkAdmin, adminController.checkAdmin, adminController.getAdmin);
router.post("/addAdmin/",auth.checkLogin,auth.checkAdmin, adminController.addAdmin);
router.put("/editAdmin/",auth.checkLogin,auth.checkAdmin, adminController.checkAdmin,adminController.editAdmin);
router.delete("/deleteAdmin/",auth.checkLogin,auth.checkAdmin, adminController.checkAdmin,adminController.deleteAdmin);

export default router;