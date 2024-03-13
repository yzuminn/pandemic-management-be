import express from "express";
import { body } from "express-validator";

import UserController from "../controllers/auth-controllers.js";
import User from "../models/user-model.js";
import Auth from '../middleware/is-auth.js'

const userController = new UserController();
const router = express.Router();
const auth = new Auth();

router.post("/login", userController.login);

router.post(
	"/signup",
	body("phoneNumber")
		.trim()
		.not()
		.isEmpty()
		.custom((value) => {
			return User.findOne({ phoneNumber: value }).then((user) => {
				if (user) {
					return Promise.reject("Phone number already exists");
				}
			});
		}),
	body("password").trim().isLength({ min: 5 }),
	userController.signup
);

export default router;
