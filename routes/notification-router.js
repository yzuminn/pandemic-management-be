import express from "express";
import NotificationController from "../controllers/notification-controller.js";
import Auth from '../middleware/is-auth.js'

const notificationController = new NotificationController();
const router = express.Router();
const auth = new Auth();

router.post("/postNotification", auth.checkLogin, notificationController.postNotification);
router.put("/editNotification", auth.checkLogin, notificationController.editNotification);
router.get("/getNotification", auth.checkLogin, notificationController.getNotification);
router.delete("/deleteNotification", auth.checkLogin, notificationController.deleteNotification);
router.get("/getListNotification", auth.checkLogin, auth.checkAdmin, notificationController.getListNotification);
router.put("/browsingNotification",auth.checkLogin, auth.checkAdmin, notificationController.browsingNotification);
router.get("/viewMedicalNotification",auth.checkLogin,notificationController.viewMedicalNotification);
router.get("/viewAdminNotification",auth.checkLogin,notificationController.viewAdminNotification);
router.get("/viewDifficultNotification", auth.checkLogin, notificationController.viewDifficultNotification);

export default router;