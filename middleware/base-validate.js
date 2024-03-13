class BaseValidate {

    checkSignUp = (req, res, next) => {
        let phoneNumber = req.body.phoneNumber;
        let password = req.body.password;
        let type = req.body.type;
        let unitCode = req.body.unitCode;
        if (phoneNumber == null || password == null || type == null || unitCode == null) {
            return res.status(400).json({
                message: "info error",
            });
        }
        if (type < 0 || type > 2) {
            return res.status(400).json({
                message: "type error",
            });
        }
        if (unitCode == "" || unitCode[0] != "|" || unitCode[unitCode.length - 1] != "|") {
            return res.status(400).json({
                message: "unitCode error",
            });
        }
        let uCode = unitCode;
        var indexP = -1;
        var indexD = -1;
        var indexW = -1;
        indexP = uCode.indexOf("|", 1);
        if (indexP != -1) indexD = uCode.indexOf("|", indexP + 1);
        if (indexD != -1) indexW = uCode.indexOf("|", indexD + 1);

        if (type == 0 && (indexP == -1 ||indexP == 1 || indexD == -1 || indexW == -1 || (indexD == indexP + 1) || (indexW == indexD + 1))) {
            return res.status(400).json({
                message: "unitCode error",
            });
        }
        if ((type == 1 || type == 2) && (indexP == -1 || indexP == 1 || (indexD == indexP + 1) || (indexW == indexD + 1))) {
            return res.status(400).json({
                message: "unitCode error",
            });
        }
        next();
    }
}

export default BaseValidate;
