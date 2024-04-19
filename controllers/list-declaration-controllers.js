import User from "../models/user-model.js";
import mongoose from "mongoose";

class ListDeclaration {


    getListDomesticGuests = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;
        let keySearch = req.query.keyword || "";
        let uCode = req.data.unitCode;
        let uCodeSplit = uCode.split("|");

        User.aggregate([
            {
                $match: {
                    type: 0,
                    status: 1,
                }
            },
            {
                $project: {
                    _id: 1,
                    type: 1,
                    status: 1,
                    unitCode: 1,
                    phoneNumber: 1,
                    unitDetail: 1,
                }
            },
            {
                $project: {
                    _id: 1,
                    type: 1,
                    status: 1,
                    unitCode: 1,
                    phoneNumber: 1,
                    unitDetail: 1,
                    permission: { $indexOfBytes: ["$unitCode", uCode] },
                    comparisonResult: { $strcasecmp: [uCode, "$unitCode"] }
                }
            },
            {
                $match: {
                    unitCode: { $regex: uCodeSplit.join("\\|") },
                    $or: [
                        { comparisonResult: -1 },
                        { comparisonResult: 0, type: 0 }
                    ],
                    permission: 0,
                    phoneNumber: { $regex: keySearch },
                }
            },
            {
                $lookup: {
                    from: 'personinfos',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'info'
                }
            },
            {
                $unwind: "$info"
            },
            {
                $lookup: {
                    from: 'domesticguests',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'declaration'
                }
            },
            {
                $unwind: "$declaration"
            },
            {
                $skip: index
            },
            {
                $limit: count
            },
        ], function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: "Error",
                });
            }
            console.log(result);
            if (result.length == 0) {
                return res.status(405).json({
                    message: "No declaration",
                })
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }


    getListEntryDeclaration = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;
        let keySearch = req.query.keyword || "";
        let uCode = req.data.unitCode;
        let uCodeSplit = uCode.split("|");

        User.aggregate([
            {
                $match: {
                    type: 0,
                    status: 1,
                }
            },
            {
                $project: {
                    _id: 1,
                    type: 1,
                    status: 1,
                    unitCode: 1,
                    phoneNumber: 1,
                    unitDetail: 1,
                }
            },
            {
                $project: {
                    _id: 1,
                    type: 1,
                    status: 1,
                    unitCode: 1,
                    phoneNumber: 1,
                    unitDetail: 1,
                    permission: { $indexOfBytes: ["$unitCode", uCode] },
                    comparisonResult: { $strcasecmp: [uCode, "$unitCode"] }
                }
            },
            {
                $match: {
                    unitCode: { $regex: uCodeSplit.join("\\|") },
                    $or: [
                        { comparisonResult: -1 },
                        { comparisonResult: 0, type: 0 }
                    ],
                    permission: 0,
                    phoneNumber: { $regex: keySearch },
                }
            },
            {
                $lookup: {
                    from: 'personinfos',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'info'
                }
            },
            {
                $unwind: "$info"
            },
            {
                $lookup: {
                    from: 'entrydeclarations',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'declaration'
                }
            },
            {
                $unwind: "$declaration"
            },
            {
                $skip: index
            },
            {
                $limit: count
            },
        ], function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: "Error",
                });
            }
            console.log(result);
            if (result.length == 0) {
                return res.status(405).json({
                    message: "No declaration",
                })
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }

    getListMoveDeclaration = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;
        let keySearch = req.query.keyword || "";
        let uCode = req.data.unitCode;
        let uCodeSplit = uCode.split("|");

        User.aggregate([
            {
                $match: {
                    type: 0,
                    status: 1,
                }
            },
            {
                $project: {
                    _id: 1,
                    type: 1,
                    status: 1,
                    unitCode: 1,
                    phoneNumber: 1,
                    unitDetail: 1,
                }
            },
            {
                $project: {
                    _id: 1,
                    type: 1,
                    status: 1,
                    unitCode: 1,
                    phoneNumber: 1,
                    unitDetail: 1,
                    permission: { $indexOfBytes: ["$unitCode", uCode] },
                    comparisonResult: { $strcasecmp: [uCode, "$unitCode"] }
                }
            },
            {
                $match: {
                    unitCode: { $regex: uCodeSplit.join("\\|") },
                    $or: [
                        { comparisonResult: -1 },
                        { comparisonResult: 0, type: 0 }
                    ],
                    permission: 0,
                    phoneNumber: { $regex: keySearch },
                }
            },
            {
                $lookup: {
                    from: 'personinfos',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'info'
                }
            },
            {
                $unwind: "$info"
            },
            {
                $lookup: {
                    from: 'domesticmovedeclarations',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'declaration'
                }
            },
            {
                $unwind: "$declaration"
            },
            {
                $skip: index
            },
            {
                $limit: count
            },
        ], function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: "Error",
                });
            }
            console.log(result);
            if (result.length == 0) {
                return res.status(405).json({
                    message: "No declaration",
                })
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }

}

export default ListDeclaration;
