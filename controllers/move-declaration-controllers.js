import MoveDeclaration from "../models/move-declaration-model.js";

class MoveDeclarationController {

    checkDeclaration = (req, res, next) => {
        const userIdReq = req.userId;
        MoveDeclaration.findOneAndDelete({ userId: userIdReq })
            .then((data) => {
                if (!data) {
                    return res.status(405).json({
                        message: "The account has not yet move declaration",
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

    addDeclaration = (req, res, next) => {
        const userIdReq = req.userId;
        MoveDeclaration.findOne({ userId: userIdReq })
            .then((result) => {
                if (result) {
                    const {
                        vehicle,
                        vehicleNumber,
                        chairNumber,
                        departureDay,
                        departureAddress,
                        arrivalAddress,
                        ismovingThroughTerritory,
                        nCoVSignal,
                        patientContact,
                        nCoVConPCountry,
                        nCoVConPSignal,
                    } = req.body;

                    const editMoveDeclaration = {
                        userId: req.userId,
                        vehicle,
                        vehicleNumber,
                        chairNumber,
                        departureDay,
                        departureAddress,
                        arrivalAddress,
                        ismovingThroughTerritory,
                        nCoVSignal,
                        patientContact,
                        nCoVConPCountry,
                        nCoVConPSignal,
                        declarationDate: new Date(),
                    };
                    MoveDeclaration.updateOne({ userId: userIdReq }, editMoveDeclaration)
                        .then(() => {
                            return res.status(201).json({
                                message: "Update a move delcaration successfully",
                                link: process.env.SERVER_URL + "/movedeclaration/getmovedeclaration"
                            });
                        })
                        .catch((err) => {
                            if (!err.statusCode) {
                                err.statusCode = 500
                            }
                            next(err)
                        })
                }
                else {
                    const {
                        vehicle,
                        vehicleNumber,
                        chairNumber,
                        departureDay,
                        departureAddress,
                        arrivalAddress,
                        ismovingThroughTerritory,
                        nCoVSignal,
                        patientContact,
                        nCoVConPCountry,
                        nCoVConPSignal,
                    } = req.body;

                    const newMoveDeclaration = {
                        userId: req.userId,
                        vehicle,
                        vehicleNumber,
                        chairNumber,
                        departureDay,
                        departureAddress,
                        arrivalAddress,
                        ismovingThroughTerritory,
                        nCoVSignal,
                        patientContact,
                        nCoVConPCountry,
                        nCoVConPSignal,
                        declarationDate: new Date(),
                    };
                    const moveDeclaration = new MoveDeclaration(newMoveDeclaration);
                    moveDeclaration.save()
                        .then((result) => {
                            return res.status(201).json({
                                message: "Add a move delcaration successfully",
                                link: process.env.SERVER_URL + "/movedeclaration/getmovedeclaration"
                            });
                        })
                        .catch((err) => {
                            if (!err.statusCode) {
                                err.statusCode = 500;
                            }
                            next(err);
                        });
                }
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err)
            });
    }

    getDeclaration = (req, res, next) => {
        const userIdReq = req.userId;
		MoveDeclaration
			.findOne({userId :  userIdReq})
			.populate('userId')
			.then((result) => {
				return res.status(200).json({
					message: "Get infomation move declaration successful",
					data: {
						userId: result.userId._id,
                        vehicle: result.vehicle,
                        vehicleNumber: result.vehicleNumber,
                        chairNumber: result.chairNumber,
                        departureDay: result.departureDay,
                        departureAddress: result.departureAddress,
                        arrivalAddress: result.arrivalAddress,
                        ismovingThroughTerritory: result.ismovingThroughTerritory,
                        nCoVSignal: result.nCoVConPSignal,
                        patientContact: result.patientContact,
                        nCoVConPCountry: result.nCoVConPCountry,
                        nCoVConPSignal: result.nCoVConPSignal,
                        declarationDate: result.declarationDate,
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

    deleteDeclaration = (req, res, next) => {
        const userIdReq = req.userId;
        MoveDeclaration.deleteOne({ userId: userIdReq })
            .then(() => {
                return res.status(200).json({
                    message: "Delete infomation move declaration successful"
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

export default MoveDeclarationController;
