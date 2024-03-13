import User from "../models/user-model.js";
import mongoose from "mongoose";

class AccountBrowsingController {

    accountBrowsing = (req, res, next) => {
        let uCode = req.data.unitCode;
        let uCodeSplit = uCode.split("|");
        let userId = req.body.userId;
        let statusAccount = req.body.status || 1;

        User.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(userId)
                }
            },
            {
                $project: {
                    unitCode: 1,
                    permission: { $indexOfBytes: ["$unitCode",uCode] },
                    comparisonResult: { $strcasecmp: [uCode, "$unitCode"] }

                }
            },
            {
                $match: {
                    unitCode: { $regex: uCodeSplit.join("\\|") },
                    comparisonResult: -1,
                    permission: 0,
                }
            },
        ], function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: "Error",
                });
            }
            console.log(result);
            if (!result) {
                return res.status(403).json({
                    message: "Fail",
                })
            }
            if (statusAccount == 1) {
                User.updateOne({ _id: req.body.userId }, { $set: { status: 1 } })
                    .then((data) => {
                        return res.status(200).json({
                            message: "Browsing account successfully",
                        })
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    });
            }
            else {
                User.deleteOne({ _id: req.body.userId })
                    .then((data) => {
                        return res.status(200).json({
                            message: "Delete account successfully",
                        })
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    });
            }
        });
    }

    getAccountAdmin = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;
        let keySearch = req.query.keyword || "";
        let uCode = req.data.unitCode;
        let uCodeSplit = uCode.split("|");

        User.aggregate([
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
                    permission: { $indexOfBytes: ["$unitCode",uCode] },
                    comparisonResult: { $strcasecmp: [uCode, "$unitCode"] }
                }
            },
            {
                $match: {
                    type: 2,
                    status: 0,
                    unitCode: { $regex: uCodeSplit.join("\\|") },
                    comparisonResult: -1,
                    permission: 0,
                    phoneNumber: { $regex: keySearch },
                }
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
                    message: "No admin account to approve",
                })
            }
            for (let i = 0; i < result.length; i++) {
                result[i] = {
                    userId: result[i]._id,
                    phoneNumber: result[i].phoneNumber,
                    unitCode: result[i].unitCode,
                    unitDetail: result[i].unitDetail,
                }
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }

    getAccountMedical = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;
        let keySearch = req.query.keyword || "";
        let uCode = req.data.unitCode;
        let uCodeSplit = uCode.split("|");

        User.aggregate([
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
                    permission: { $indexOfBytes: ["$unitCode",uCode] },
                    comparisonResult: { $strcasecmp: [uCodeSplit.join("\\|"), "$unitCode"] },
                }
            },
            {
                $match: {
                    type: 1,
                    status: 0,
                    unitCode: { $regex: uCodeSplit.join("\\|") },
                    comparisonResult: -1,
                    permission: 0,
                    phoneNumber: { $regex: keySearch },
                }
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
                    message: "No medical account to approve",
                })
            }
            for (let i = 0; i < result.length; i++) {
                result[i] = {
                    userId: result[i]._id,
                    phoneNumber: result[i].phoneNumber,
                    unitCode: result[i].unitCode,
                    unitDetail: result[i].unitDetail,
                }
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }
}
export default AccountBrowsingController;
