import MedicalInfo from "../models/medical-info-model.js";

class MedicalController {

	checkMedical = (req, res, next) => {
		const userIdReq = req.userId;
		MedicalInfo.findOne({ userId: userIdReq })
			.then((data) => {
				if (!data) {
					return res.status(405).json({
						message: "The account has not yet registered information",
					})
				}
				else {
					req.data = data
					next()
				}
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	}

	addMedical = (req, res, next) => {
		const userIdReq = req.userId;
		MedicalInfo.findOne({ userId: userIdReq })
			.then((result) => {
				if (result) {
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

				const newMedicalInfo = {
					userId: userIdReq,
					fullName,
					dateOfBirth,
					Sex,
					addressCode,
					address,
					nationality,
					diseaseStatus,
				};
				const medicalInfo = new MedicalInfo(newMedicalInfo);
				medicalInfo
					.save()
					.then(() => {
						return res.status(201).json({
							message: "Successful registration information",
							link: process.env.SERVER_URL + "/medicalinfo/getmedical",
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
	}

	editMedical = (req, res, next) => {
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

		const editMedicalInfo = {
			userId: userIdReq,
			fullName,
			dateOfBirth,
			Sex,
			addressCode,
			address,
			nationality,
			diseaseStatus,
		};
		MedicalInfo.updateOne({ userId: userIdReq }, editMedicalInfo)
			.then((result) => {
				return res.status(201).json({
					message: "Update infomation successful",
					link: process.env.SERVER_URL + "/medicalinfo/getmedical",
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500
				}
				next(err)
			})
	}

	getMedical = (req, res, next) => {
		const userIdReq = req.userId;

		MedicalInfo
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
	}

	deleteMedical = (req, res, next) => {
		const userIdReq = req.userId;
		MedicalInfo.deleteOne({ userId: userIdReq })
			.then(() => {
				return res.status(200).json({
					message: "Delete infomation successful"
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			})
	}
}

export default MedicalController;
