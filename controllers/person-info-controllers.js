import { validationResult } from "express-validator";
import PersonInfo from "../models/person-info-model.js";
import User from '../models/user-model.js';

class PersonController {
	checkPerson = (req, res, next) => {
		const userIdReq = req.userId;
		PersonInfo.findOne({ userId: userIdReq })
			.then((data) => {
				if (!data) {
					res.status(405).json({
						message:
							"The account has not yet registered information",
					});
				} else {
					req.data = data;
					next();
				}
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	};

	// get all user list
	getAll = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const err = new Error("Validation fail. Cannot get all users !");
			err.statusCode = 422;
			err.data = errors.array();
			throw err;
		}

		PersonInfo.find()
			.then((data) => {
				console.log("all users:", data);

				res.status(200).json({
					message: "Fetching all users successfully",
					data: data,
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	};

	addPerson = (req, res, next) => {
		const userIdReq = req.userId;
		PersonInfo.findOne({ userId: userIdReq })
			.then((result) => {
				if (result) {
					console.log(result)
					return res.status(403).json({
						message: "Cannot add new infomation",
					})
				}

				const {
					fullName,
					dateOfBirth,
					Sex,
					addressCode,
					address,
					nationality,
					diseaseStatus,
				} = req.body;

				const newPersonInfo = {
					userId: userIdReq,
					fullName,
					dateOfBirth,
					Sex,
					addressCode,
					address,
					nationality,
					diseaseStatus,
				};
				const personInfo = new PersonInfo(newPersonInfo);
				personInfo
					.save()
					.then(() => {
						return res.status(201).json({
							message: "Successful registration information",
							link: process.env.SERVER_URL + "/personinfo/getperson",
						});
					})
					.catch((err) => {
						if (!err.statusCode) {
							err.statusCode = 500;
						}
						next(err);
					});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	};

	editPerson = (req, res, next) => {
		const userIdReq = req.userId;
		const {
			fullName,
			dateOfBirth,
			Sex,
			addressCode,
			address,
			nationality,
			diseaseStatus,
		} = req.body;

		const editPersonInfo = {
			userId: userIdReq,
			fullName,
			dateOfBirth,
			Sex,
			addressCode,
			address,
			nationality,
			diseaseStatus,
		};
		PersonInfo.updateOne({ userId: userIdReq }, editPersonInfo)
			.then(() => {
				return res.status(201).json({
					message: "Update infomation successful",
					link: process.env.SERVER_URL + "/personinfo/getperson",
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	};

	getPerson = (req, res, next) => {
		const userIdReq = req.userId;

		PersonInfo
			.findOne({ userId: userIdReq })
			.populate('userId')
			.then((user) => {
				return res.status(200).json({
					message: "Fetching user info successfully",
					data: {
						userId: user.userId._id,
						phoneNumber: user.userId.phoneNumber,
						fullName: user.fullName,
						dateOfBirth: user.dateOfBirth,
						Sex: user.Sex,
						addressCode: user.addressCode,
						address: user.address,
						nationality: user.nationality,
						diseaseStatus: user.diseaseStatus,
					},
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	};

	deletePerson = (req, res, next) => {
		const userIdReq = req.userId;
		PersonInfo.deleteOne({ userId: userIdReq })
			.then(() => {
				res.status(200).json({
					message: "Delete infomation successful",
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	};
}

export default PersonController;
