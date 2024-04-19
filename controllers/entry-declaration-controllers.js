import EntryDeclaration from "../models/entry-declaration-model.js";

class EntryDeclarationController {

    checkDeclaration = (req, res, next) => {
        const userIdReq = req.userId;
        EntryDeclaration.findOne({ userId: userIdReq })
            .then((data) => {
                if (!data) {
                    return res.status(405).json({
                        message: "The account has not yet entry declaration",
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
        EntryDeclaration.findOne({ userId: userIdReq })
            .then((result) => {
                if (result) {
                    const {
                        object,
                        gate,
                        vehicle,
                        vehicleNumber,
                        chairNumber,
                        departureDay,
                        entryDate,
                        departureCountry,
                        departureCity,
                        destinationCountry,
                        passingCountry,
                        addressAfterQuarantine,
                        fever,
                        cough,
                        stuffy,
                        soreThroat,
                        nausea,
                        diarrhea,
                        hemorrhage,
                        rash,
                        vaccinesUsed,
                        animalContact,
                        nCoVPContact,
                        isolationFacility,
                        negativeConfirmation,
                    } = req.body;

                    const editEntryDeclaration = {
                        userId: req.userId,
                        object,
                        gate,
                        vehicle,
                        vehicleNumber,
                        chairNumber,
                        departureDay,
                        entryDate,
                        departureCountry,
                        departureCity,
                        destinationCountry,
                        passingCountry,
                        addressAfterQuarantine,
                        fever,
                        cough,
                        stuffy,
                        soreThroat,
                        nausea,
                        diarrhea,
                        hemorrhage,
                        rash,
                        vaccinesUsed,
                        animalContact,
                        nCoVPContact,
                        isolationFacility,
                        negativeConfirmation,
                        declarationDate: new Date(),
                    };
                    EntryDeclaration.updateOne({ userId: userIdReq }, editEntryDeclaration)
                        .then(() => {
                            return res.status(201).json({
                                message: "Update a domestic entry declaration successfully",
                                link: process.env.SERVER_URL + "/entrydeclaration/getmovedeclaration"
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
                        object,
                        gate,
                        vehicle,
                        vehicleNumber,
                        chairNumber,
                        departureDay,
                        entryDate,
                        departureCountry,
                        departureCity,
                        destinationCountry,
                        passingCountry,
                        addressAfterQuarantine,
                        fever,
                        cough,
                        stuffy,
                        soreThroat,
                        nausea,
                        diarrhea,
                        hemorrhage,
                        rash,
                        vaccinesUsed,
                        animalContact,
                        nCoVPContact,
                        isolationFacility,
                        negativeConfirmation,
                    } = req.body;

                    const newEntryDeclaration = {
                        userId: req.userId,
                        object,
                        gate,
                        vehicle,
                        vehicleNumber,
                        chairNumber,
                        departureDay,
                        entryDate,
                        departureCountry,
                        departureCity,
                        destinationCountry,
                        passingCountry,
                        addressAfterQuarantine,
                        fever,
                        cough,
                        stuffy,
                        soreThroat,
                        nausea,
                        diarrhea,
                        hemorrhage,
                        rash,
                        vaccinesUsed,
                        animalContact,
                        nCoVPContact,
                        isolationFacility,
                        negativeConfirmation,
                        declarationDate: new Date(),
                    };
                    const entryDeclaration = new EntryDeclaration(newEntryDeclaration);
                    entryDeclaration.save()
                        .then((result) => {
                            return res.status(201).json({
                                message: "Add a domestic entry declaration successfully",
                                link: process.env.SERVER_URL + "/entrydeclaration/getmovedeclaration"
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
        EntryDeclaration
            .findOne({ userId: userIdReq })
            .populate('userId')
            .then(() => {
                return res.status(200).json({
                    message: "Get infomation entry declaration successful",
                    data: {
                        userId: result.userId._id,
                        object: result.object,
                        gate: result.gate,
                        vehicle: result.vehicle,
                        vehicleNumber: result.vehicleNumber,
                        chairNumber: result.chairNumber,
                        departureDay: result.departureDay,
                        entryDate: result.entryDate,
                        departureCountry: result.departureCountry,
                        departureProvince: result.departureProvince,
                        destinationCountry: result.destinationCountry,
                        passingCountry: result.passingCountry,
                        addressAfterQuarantine: result.addressAfterQuarantine,
                        fever: result.fever,
                        cough: result.cough,
                        stuffy: result.stuffy,
                        soreThroat: result.soreThroat,
                        nausea: result.nausea,
                        diarrhea: result.diarrhea,
                        hemorrhage: result.hemorrhage,
                        rash: result.rash,
                        vaccinesUsed: result.vaccinesUsed,
                        animalContact: result.animalContact,
                        nCoVPContact: result.nCoVPContact,
                        isolationFacility: result.isolationFacility,
                        negativeConfirmation: result.negativeConfirmation,
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
        EntryDeclaration.deleteOne({ userId: userIdReq })
            .then(() => {
                return res.status(200).json({
                    message: "Delete infomation entry declaration successful"
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

export default EntryDeclarationController;
