import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import { validationResult } from "express-validator";

class Auth {

	checkLogin = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const err = new Error("Validation fail !");
			err.statusCode = 422;
			err.data = errors.array();
			throw err;
		}
		try {

			// using bearer token
			let decodedToken = req.get('authorization').split(' ')[1];
			var user = jwt.verify(decodedToken, process.env.JWT_SECRET);

			User.findOne({ _id: user.userId, status: 1 })
				.then((data) => {
					if (data) {
						req.data = data;
						req.userId = user.userId;
						next();
					} else {
						return res.status(405).json({
							message: "Account does not exist or unapproved",
						});
					}
				})
				.catch((err) => {
					if (!err.statusCode) {
						err.statusCode = 500;
					}
					next(err);
				});
		} catch (error) {
			return res.status(401).json({
				message: "Token error",
			});
		}
	};

	checkPerson = (req, res, next) => {
		try {
			var type = req.data.type;
			if (type == 0) {
				next();
			} else {
				return res.status(403).json({
					message: "Not have access",
				});
			}
		} catch (error) {
			return res.status(500).json({
				message: "Server error",
			});
		}
	};

	checkMedical = (req, res, next) => {
		try {
			var type = req.data.type;
			if (type == 1) {
				next();
			} else {
				return res.status(403).statusjson({
					message: "Not have access",
				});
			}
		} catch (error) {
			return res.status(500).json({
				message: "Server error",
			});
		}
	};

	checkAdmin = (req, res, next) => {
		try {
			var type = req.data.type;
			if (type == 2) {
				next();
			} else {
				return res.status(403).json({
					message: "Not have access",
				});
			}
		} catch (error) {
			return res.status(500).json({
				message: "Server error",
			});
		}
	};

	checkAdminOrMedical = (req, res, next) => {
		try {
			var type = req.data.type;
			if (type == 2 || type == 1) {
				next();
			} else {
				return res.status(403).json({
					message: "Not have access",
				});
			}
		} catch (error) {
			return res.status(500).json({
				message: "Server error",
			});
		}
	};

}

export default Auth;
