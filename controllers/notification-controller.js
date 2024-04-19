import Notification from "../models/notification-model.js";
import User from '../models/user-model.js';
import mongoose from "mongoose";

class NotificationController {

    postNotification = (req, res, next) => {
        if (req.body.notificationContent == null) {
            return res.status(400).json({
                message: "Notification Content not null!",
            });
        }
        const userIdReq = req.userId;
        const typeNotification = req.data.type;
        var statusNotification = 0;
        if (req.data.unitCode.toString() == "") {
            statusNotification = 1;
        }
        const {
            notificationContent,
            title,
        } = req.body;
        if (typeNotification == 0) {
            User.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(userIdReq),
                    }
                },
                {
                    $lookup: {
                        from: 'personinfos',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'person'
                    }
                },
                {
                    $unwind: "$person"
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
                        message: "Fail",
                    });
                }

                const newNotification = {
                    userId: userIdReq,
                    notificationContent,
                    title,
                    posterName: result[0].person.fullName,
                    status: statusNotification,
                    time: new Date(),
                };
                const notification = new Notification(newNotification);
                notification
                    .save()
                    .then((result) => {
                        return res.status(200).json({
                            message: "Successful post notification",
                        });
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    });
            })
        } else if (typeNotification == 1) {
            User.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(userIdReq),
                    }
                },
                {
                    $lookup: {
                        from: 'medicalinfos',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'medical'
                    }
                },
                {
                    $unwind: "$medical"
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
                        message: "Fail",
                    });
                }

                const newNotification = {
                    userId: userIdReq,
                    notificationContent,
                    title,
                    posterName: result[0].medical.fullName,
                    status: statusNotification,
                    time: new Date(),
                };
                const notification = new Notification(newNotification);
                notification
                    .save()
                    .then((result) => {
                        return res.status(200).json({
                            message: "Successful post notification",
                        });
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    });
            })
        } else {
            User.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(userIdReq),
                    }
                },
                {
                    $lookup: {
                        from: 'admininfos',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'admin'
                    }
                },
                {
                    $unwind: "$admin"
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
                        message: "Fail Admin",
                    });
                }

                const newNotification = {
                    userId: userIdReq,
                    notificationContent,
                    title,
                    posterName: result[0].admin.fullName,
                    status: statusNotification,
                    time: new Date(),
                };
                const notification = new Notification(newNotification);
                notification
                    .save()
                    .then((result) => {
                        return res.status(200).json({
                            message: "Successful post notification",
                        });
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    });
            })
        }
    }

    editNotification = (req, res, next) => {
        if (req.body.notificationContent == null) {
            res.status(400).json({
                message: "Notification Content not null!",
            });
        }
        const userIdReq = req.userId;
        const notificationContent = req.body.notificationContent;
        const title = req.body.title;
        const notificationId = req.body.notificationId;
        Notification.findOne({ _id: notificationId, status: 0, userId: userIdReq })
            .then((result) => {
                if (!result) {
                    return res.status(405).json({
                        message: "Fail",
                    });
                }
                else {
                    Notification.updateOne({ _id: notificationId }, { notificationContent: notificationContent, title: title })
                        .then((result) => {
                            return res.status(200).json({
                                message: "Successful edit notification",
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
                next(err);
            });
    }

    getNotification = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;
        const userIdReq = req.userId;

        Notification.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userIdReq)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
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
                    message: "Have not notification",
                });
            }
            for (let i = 0; i < result.length; i++) {
                result[i] = {
                    type: result[i].user.type,
                    notificationId: result[i]._id,
                    title: result[i].title,
                    notificationContent: result[i].notificationContent,
                    timePost: result[i].time,
                    posterName: result[i].posterName,
                    unitDetail: result[i].user.unitDetail,
                }
            }
            return res.status(200).json({
                message: "Successful get notification",
                data: result,
            });
        });
    }

    deleteNotification = (req, res, next) => {
        const userIdReq = req.userId;
        const notificationId = req.body.notificationId;
        Notification.findOne({ _id: notificationId, userId: userIdReq })
            .then((result) => {
                if (!result) {
                    return res.status(405).json({
                        message: "Fail",
                    });
                }
                else {
                    Notification.deleteOne({ _id: notificationId })
                        .then(result => {
                            return res.status(200).json({
                                message: "Successful delete notification",
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
                next(err);
            });
    }


    getListNotification = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;
        let uCode = req.data.unitCode;
        let uCodeSplit = uCode.split("|");

        Notification.aggregate([
            {
                $match: {
                    notificationContent: { $gt: "" },
                    status: 0,
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    user: 1,
                    unitCode: "$user.unitCode",
                    type: "$user.type",
                    notificationId: 1,
                    title: 1,
                    notificationContent: 1,
                    time: 1,
                    posterName: 1,
                }
            },
            {
                $project: {
                    user: 1,
                    type: 1,
                    unitCode: 1,
                    notificationId: 1,
                    title: 1,
                    notificationContent: 1,
                    time: 1,
                    posterName: 1,
                    comparisonResult: { $strcasecmp: [uCode, "$unitCode"] },
                    permission: { $indexOfBytes: ["$unitCode",uCode] },
                }
            },
            {
                $match: {
                    unitCode: { $regex: uCodeSplit.join("\\|") },
                    permission: 0,
                    $or: [
                        { comparisonResult: -1 },
                        { comparisonResult: 0, type: 0 }
                    ]
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
            console.log(result.length);
            if (result.length == 0) {
                return res.status(405).json({
                    message: "Have not notification",
                });
            }
            for (var i = 0; i < result.length; i++) {
                result[i] = {
                    type: result[i].user.type,
                    notificationId: result[i]._id,
                    title: result[i].title,
                    notificationContent: result[i].notificationContent,
                    timePost: result[i].time,
                    posterName: result[i].posterName,
                    unitDetail: result[i].user.unitDetail,
                };
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }

    browsingNotification = (req, res, next) => {
        let uCode = req.data.unitCode;
        let uCodeSplit = uCode.split("|");
        var notificationId = req.body.notificationId;
        let statusNotification = req.body.status;

        Notification.findOne({ _id: notificationId })
            .then(result => {
                if (result.toString() == "") {
                    return res.status(400).json({
                        message: "notificationId error",
                    });
                } else {
                    User.aggregate([
                        {
                            $match: {
                                _id: mongoose.Types.ObjectId(result.userId)
                            }
                        },
                        {
                            $project: {
                                unitCode: 1,
                                type: 1,
                                comparisonResult: { $strcasecmp: [uCode, "$unitCode"] },
                                permission: { $indexOfBytes: ["$unitCode",uCode] },
                            }
                        },
                        {
                            $match: {
                                unitCode: { $regex: uCodeSplit.join("\\|") },
                                permission: 0,
                                $or: [
                                    { comparisonResult: -1 },
                                    { comparisonResult: 0, type: 0 }
                                ]
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
                        if (statusNotification == 1) {
                            Notification.updateOne({ _id: notificationId }, { $set: { status: 1 } })
                                .then(() => {
                                    return res.status(200).json({
                                        message: "Browsing notification successfully",
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
                            Notification.deleteOne({ _id: notificationId })
                                .then(() => {
                                    return res.status(200).json({
                                        message: "Delete notification successfully",
                                    });
                                })
                                .catch((err) => {
                                    if (!err.statusCode) {
                                        err.statusCode = 500
                                    }
                                    next(err)
                                })
                        }
                    });
                }
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    }

    viewMedicalNotification = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;
        let uCode = req.data.unitCode;

        Notification.aggregate([
            {
                $match: {
                    status: 1,
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
            },
            {
                $addFields: {
                    uCode: uCode,
                }
            },
            {
                $project: {
                    user: 1,
                    uCode: 1,
                    title: 1,
                    notificationContent: 1,
                    time: 1,
                    posterName: 1,
                    unitCode: "$user.unitCode",
                    type: "$user.type",
                }
            },
            {
                $project: {
                    user: 1,
                    uCode: 1,
                    title: 1,
                    notificationContent: 1,
                    time: 1,
                    posterName: 1,
                    type: 1,
                    permission: { $indexOfBytes: ["$uCode", "$unitCode"] },
                }
            },
            {
                $match: {
                    type: 1,
                    permission: 0,
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
                    message: "Have not notification",
                });
            }
            for (var i = 0; i < result.length; i++) {
                result[i] = {
                    notificationId: result[i]._id,
                    type: result[i].user.type,
                    title: result[i].title,
                    notificationContent: result[i].notificationContent,
                    timePost: result[i].time,
                    posterName: result[i].posterName,
                    unitDetail: result[i].user.unitDetail,
                };
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }

    viewAdminNotification = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;
        let uCode = req.data.unitCode;

        Notification.aggregate([
            {
                $match: {
                    status: 1,
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
            },
            {
                $addFields: {
                    uCode: uCode,
                }
            },
            {
                $project: {
                    user: 1,
                    uCode: 1,
                    title: 1,
                    notificationContent: 1,
                    time: 1,
                    posterName: 1,
                    unitCode: "$user.unitCode",
                    type: "$user.type",
                }
            },
            {
                $project: {
                    user: 1,
                    uCode: 1,
                    title: 1,
                    notificationContent: 1,
                    time: 1,
                    posterName: 1,
                    type: 1,
                    permission: { $indexOfBytes: ["$uCode", "$unitCode"] },
                }
            },
            {
                $match: {
                    type: 2,
                    permission: 0,
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
                    message: "Have not notification",
                });
            }
            for (var i = 0; i < result.length; i++) {
                result[i] = {
                    notificationId: result[i]._id,
                    type: result[i].user.type,
                    title: result[i].title,
                    notificationContent: result[i].notificationContent,
                    timePost: result[i].time,
                    posterName: result[i].posterName,
                    unitDetail: result[i].user.unitDetail,
                };
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }

    viewDifficultNotification = (req, res, next) => {
        let index = parseInt(req.query.index) || 0;
        let count = parseInt(req.query.count) || 20;

        Notification.aggregate([
            {
                $match: {
                    notificationContent: { $gt: "" },
                    status: 1,
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    user: 1,
                    title: 1,
                    notificationContent: 1,
                    time: 1,
                    posterName: 1,
                    type: "$user.type",
                }
            },
            {
                $match: {
                    type: 0,
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
                    message: "Have not notification",
                });
            }
            for (var i = 0; i < result.length; i++) {
                result[i] = {
                    notificationId: result[i]._id,
                    type: result[i].user.type,
                    title: result[i].title,
                    notificationContent: result[i].notificationContent,
                    timePost: result[i].time,
                    posterName: result[i].posterName,
                    unitDetail: result[i].user.unitDetail,
                };
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }
}
export default NotificationController;
