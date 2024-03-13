import express from "express";

import Auth from '../middleware/is-auth.js';
import UnitController from '../controllers/unit-controllers.js';


const router = express.Router();
const auth = new Auth();
const unitController = new UnitController();

router.get('/unit-info', unitController.getUnitInfo );
router.get('/unit-single', unitController.getSingleUnit)
router.put('/unit-update', auth.checkLogin, auth.checkAdmin, unitController.editUnit );


export default router;