import DomesticGuests from "../models/domestic-guests-model.js";

class DomesticGuestsController {

    checkDeclaration = (req, res, next) => {
        const userIdReq = req.userId;
        DomesticGuests.findOne({ userId: userIdReq })
            .then((data) => {
                if (!data) {
                    return res.status(405).json({
                        message: "The account has not yet domestic guests",
                    })
                }
                else {
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
        DomesticGuests.findOne({ userId: userIdReq })
            .then((result) => {
                if (result) {
                    const {
                        ismovingThroughTerritory,
                        nCoVSignal,
                        patientContact,
                        nCoVConPCountry,
                        nCoVConPSignal,
                    } = req.body;

                    const editDomesticGuests = {
                        userId: req.userId,
                        ismovingThroughTerritory,
                        nCoVSignal,
                        patientContact,
                        nCoVConPCountry,
                        nCoVConPSignal,
                        declarationDate: new Date(),
                    };
                    DomesticGuests.updateOne({ userId: userIdReq }, editDomesticGuests)
                        .then(() => {
                            return res.status(201).json({
                                message: "Update a domestic guests successfully",
                                link: process.env.SERVER_URL + "/domesticguests/getdomesticguests"
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
                        ismovingThroughTerritory,
                        nCoVSignal,
                        patientContact,
                        nCoVConPCountry,
                        nCoVConPSignal,
                    } = req.body;

                    const newDomesticGuests = {
                        userId: req.userId,
                        ismovingThroughTerritory,
                        nCoVSignal,
                        patientContact,
                        nCoVConPCountry,
                        nCoVConPSignal,
                        declarationDate: new Date(),
                    };
                    const domesticGuests = new DomesticGuests(newDomesticGuests);
                    domesticGuests.save()
                        .then((result) => {
                            return res.status(201).json({
                                message: "Add a domestic guests successfully",
                                link: process.env.SERVER_URL + "/domesticguests/getdomesticguests"
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
        DomesticGuests
            .findOne({ userId: userIdReq })
            .populate('userId')
            .then((result) => {
                return res.status(200).json({
                    message: "Get infomation domestic guests successful",
                    data: {
                        userId: result.userId._id,
                        ismovingThroughTerritory: result.ismovingThroughTerritory,
                        nCoVSignal: result.nCoVSignal,
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
        DomesticGuests.deleteOne({ userId: userIdReq })
            .then(() => {
                return res.status(200).json({
                    message: "Delete infomation domestic guests successful"
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

export default DomesticGuestsController;
