import AdminInfo from "../models/admin-info-model.js";

class AdminController {

	checkAdmin = (req, res, next) => {
		const userIdReq = req.userId;
		AdminInfo.findOne({ userId: userIdReq })
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

	addAdmin = (req, res, next) => {
		const userIdReq = req.userId;
		AdminInfo.findOne({ userId: userIdReq })
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

				const newAdminInfo = {
					userId: userIdReq,
					fullName,
					dateOfBirth,
					Sex,
					addressCode,
					address,
					nationality,
					diseaseStatus,
				};
				const adminInfo = new AdminInfo(newAdminInfo);
				adminInfo
					.save()
					.then(() => {
						return res.status(201).json({
							message: "Successful registration information",
							link: process.env.SERVER_URL + "/admininfo/getadmin",
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

	editAdmin = (req, res, next) => {
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

		const editAdminInfo = {
			userId: userIdReq,
			fullName,
			dateOfBirth,
			Sex,
			addressCode,
			address,
			nationality,
			diseaseStatus,
		};
		AdminInfo.updateOne({ userId: userIdReq }, editAdminInfo)
			.then((result) => {
				return res.status(201).json({
					message: "Update infomation successful",
					link: process.env.SERVER_URL + "/admininfo/getadmin",
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	}

	getAdmin = (req, res, next) => {
		const userIdReq = req.userId;
		AdminInfo
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

	deleteAdmin = (req, res, next) => {
		const userIdReq = req.userId;
		AdminInfo.deleteOne({ userId: userIdReq })
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

export default AdminController;
