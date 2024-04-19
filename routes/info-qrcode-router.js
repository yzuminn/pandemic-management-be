import express from "express";
import InfoQrcodeController from "../controllers/info-qrcode-controllers.js";

const infoQrcodeController = new InfoQrcodeController();
const router = express.Router();

router.get("/getUserInfoByPhoneNumber", infoQrcodeController.getUserInfoByPhoneNumber);

export default router;