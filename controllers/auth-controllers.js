import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from "../models/user-model.js";
dotenv.config();

class UserController {

	signup = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const err = new Error("Validation fail !");
			err.statusCode = 422;
			err.data = errors.array();
			throw err;
		}

		//extract user input
		const phoneNumber = req.body.phoneNumber;
		const password = req.body.password;
		const type = req.body.type;
		const unitCode = req.body.unitCode;
		const unitDetail = req.body.unitDetail;
		let status = 0;
		if (type == 0) status = 1;

		bcrypt
			.hash(password, 12)
			.then((hashPassword) => {
				const user = new User({
					phoneNumber: phoneNumber,
					password: hashPassword,
					type: type,
					unitCode: unitCode,
					status: status,
					unitDetail: unitDetail,
				});

				return user.save();
			})
			.then((result) => {
				res.status(200).json({
					message: "Signup successful",
					userId: result._id,
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	};

	// [POST] auth/login
	login = (req, res, next) => {
		const phoneNumber = req.body.phoneNumber;
		const password = req.body.password;

		let loadedUser;
		let type, unitCode, unitDetail;

		// find if phone number is exists
		User.findOne({ phoneNumber: phoneNumber })
			.then(user => {
				if (!user) {
					return res.status(400).json({
						message: "Invalid phone number",
					});
				}

				if (user.status == 0) {
					return res.status(401).json({
						message: "Account not approved!",
					});
				}

				loadedUser = user;
				type = user.type;
				unitCode = user.unitCode;
				unitDetail = user.unitDetail;

				return bcrypt.compare(password.toString(), loadedUser.password);

			})
			.then(result => {
				if (!result) {
					const err = new Error("Wrong password");
					err.statusCode = 400;
					throw err;
				}
				//generate token
				const token = jwt.sign({
					phoneNumber: loadedUser.phoneNumber,
					userId: loadedUser._id.toString(),
				},
					process.env.JWT_SECRET,
					{
						expiresIn: '1h'
					}
				);

				res.status(200).json({
					token,
					type: type,
					unitCode,
					unitDetail,
					userId: loadedUser._id.toString(),
				})
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	};
}

export default UserController;
