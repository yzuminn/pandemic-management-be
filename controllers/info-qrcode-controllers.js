import User from "../models/user-model.js";

class InfoQrcodeController {

    getUserInfoByPhoneNumber = (req, res, next) => {
        if (req.query.phoneNumber == null) {
            return res.status(405).json({
                message: "Phone number not null",
            })
        }
        let phoneNumber = req.query.phoneNumber;
        User.aggregate([
            {
                $match: {
                    phoneNumber: phoneNumber,
                }
            },
            {
                $project: {
                    password: 0,
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
                    as: 'domesticguest'
                }
            },
            {
                $lookup: {
                    from: 'entrydeclarations',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'entrydeclaration'
                }
            },
            {
                $lookup: {
                    from: 'domesticmovedeclarations',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'domesticmovedeclaration'
                }
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
                    message: "Not found info",
                })
            }
            return res.status(200).json({
                message: "Successfully",
                data: result,
            });
        });
    }

}
export default InfoQrcodeController;
