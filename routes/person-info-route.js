import express from "express";
import PersonController from "../controllers/person-info-controllers.js";
import Auth from "../middleware/is-auth.js"

const personController = new PersonController();
const router = express.Router();
const auth = new Auth();

// router nay chua dung auth.checkPerson, personController.checkPerson
router.get('/getAll', auth.checkLogin, personController.getAll)

router.get("/getPerson/",auth.checkLogin,auth.checkPerson, personController.checkPerson, personController.getPerson);

// toi nghi la khong can :id khi add - vi do la thong tin cua minh
router.post("/addPerson",auth.checkLogin,auth.checkPerson, personController.addPerson);

router.put("/editPerson",auth.checkLogin,auth.checkPerson, personController.checkPerson,personController.editPerson);

router.delete("/deletePerson", auth.checkLogin,auth.checkPerson, personController.checkPerson,personController.deletePerson);

export default router;