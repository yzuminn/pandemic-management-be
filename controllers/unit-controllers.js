import UserModel from "../models/user-model.js";
import PersonInfo from "../models/person-info-model.js";
import UnitModel from "../models/unit-model.js";

const setWarningLevel = (cases) => {
  let level = 0;
  if (cases > 10) {
    level = 3;
  } else if (cases > 7) {
    level = 2;
  } else if (cases > 3) {
    level = 1;
  }

  return level;
};

class UnitController {
  // [GET] /unit/unit-info
  // unit/unit-info/:unit?page=2&total
  getUnitInfo = async (req, res, next) => {
    const page = +req.query.page || 1;
    const total = +req.query.total || 30;

    //attract location that user want to see: |1|1|1| |1|1|
    const unit = req.query.unit;

    const keyword = req.query.keyword;

    let unitSplit = unit.split("|");

    let unitList;

    // console.log("unit: " + unit);


    // find user that belongs to location

    if (unit == "|") {

      let query = { type: "p" };
      if (keyword) {
        query.unitName = { $regex: keyword };
      }

      console.log("query: " + query);

      try {
        unitList = await UnitModel.find(query)
          .skip((page - 1) * total)
          .limit(total);

        console.log("all: " + unitList.length);
      } catch (err) {
        res.status(403).json(err);
      }
    } else {
      if (unitSplit.length === 3) {
        console.log("khong tim all");

        let query = {
          unitCode: { $regex: `^${unitSplit.join("\\|")}` },
          type: { $ne: "w" },
        };

        if (keyword) {
          query.unitName = { $regex: keyword };
        }

        try {
          unitList = await UnitModel.find(query)
            .skip((page - 1) * total)
            .limit(total);
        } catch (error) {
          res.status(403).json(err);
        }
      } else {

        let query = {
          unitCode: { $regex: `^${unitSplit.join("\\|")}` },
        };

        if (keyword) {
          query.unitName = { $regex: keyword };
        }

        try {
          unitList = await UnitModel.find(query)
            .skip((page - 1) * total)
            .limit(total);
        } catch (error) {
          res.status(403).json(err);
        }
      }
    }

    console.log("unitList: ", unitList);
    if(unitList.length === 0){
      res.status(405).json({
        message:"No unit list found"
      });
    } else{

      res.status(200).json({
        message: "fetching list of units successfully",
        data: unitList,
      });
    }


  };

  getSingleUnit = async(req, res, next) => {
    const unitCode = req.query.unit;

    let unit;
    try{
      unit = await UnitModel.findOne({unitCode: unitCode});
      
    }catch(err){
      res.status(403).json(err);
    }
    console.log("unit: ", unit);
    if(!unit){
      return res.status(405).json({
        message:"No unit found"
      });
    } 
    res.status(200).json({
      message: "fetching unit successfully",
      data: unit,
    })
  }


  editUnit = async (req, res, next) => {
    const { lastUpdateCases, lastUpdateDeaths, lastUpdateRecovereds } =
      req.body;
    const unitId = req.query.unit;
    let unitSplit = unitId.split("|");
    console.log("unitPlilt: " + unitSplit);

    let unit_p = "|"+unitSplit[1]+"|";
    let unit_d = unit_p + unitSplit[2]+"|";
    let unit_w = unit_d + unitSplit[3]+"|";

    console.log("unit: ", unit_p)
    console.log("unit: ", unit_d)
    console.log("unit: ", unit_w)


    let unit;
    try {
      unit = await UnitModel.findOne({ unitCode: unitId });
    } catch (err) {
      res.status(403).json(err);
    }
    console.log("unit o xa :", unit_w);

    const newCases =
      unit.totalCases +
      lastUpdateCases -
      lastUpdateDeaths -
      lastUpdateRecovereds;
    const newDeaths = unit.totalDeaths + lastUpdateDeaths;
    const newRecovers = unit.totalRecovereds + lastUpdateRecovereds;

    UnitModel.findOne({ unitCode: unit_w })
      .then((unit) => {
        unit.totalCases += lastUpdateCases;
        unit.totalDeaths += lastUpdateDeaths;
        unit.totalRecovereds += lastUpdateRecovereds;
        unit.lastUpdateCases = lastUpdateCases;
        unit.lastUpdateDeaths = lastUpdateDeaths;
        unit.lastUpdateRecovereds = lastUpdateRecovereds;

        // console.log("Warning brfore:", unit.warningLevel);

        unit.warningLevel = setWarningLevel(unit.totalCases);
        // console.log("Warning after:", unit.warningLevel);

        return unit.save();
      })
      .then(() => {
        console.log("update w successfull");
      })
      .catch((err) => {
        next(err);
      });

    //update d_unit:
    // let w_unit = unitId.slice(0, -2);
    console.log("w_unit: ", unit_d);
    UnitModel.findOne({ unitCode: unit_d })
      .then((unit) => {
        unit.totalCases += lastUpdateCases;
        unit.totalDeaths += lastUpdateDeaths;
        unit.totalRecovereds += lastUpdateRecovereds;
        unit.lastUpdateCases = lastUpdateCases;
        unit.lastUpdateDeaths = lastUpdateDeaths;
        unit.lastUpdateRecovereds = lastUpdateRecovereds;

        //update warningLevel
        unit.warningLevel = setWarningLevel(unit.totalCases);

        return unit.save();
      })
      .then(() => {
        console.log("update w successfull");
      })
      .catch((err) => {
        next(err);
      });

    //update d_unit
    // let d_unit = w_unit.slice(0, -2);
    console.log("d_unit: ", unit_p);
    UnitModel.findOne({ unitCode: unit_p })
      .then((unit) => {
        unit.totalCases += lastUpdateCases;
        unit.totalDeaths += lastUpdateDeaths;
        unit.totalRecovereds += lastUpdateRecovereds;
        unit.lastUpdateCases = lastUpdateCases;
        unit.lastUpdateDeaths = lastUpdateDeaths;
        unit.lastUpdateRecovereds = lastUpdateRecovereds;

        //update warningLevel
        unit.warningLevel = setWarningLevel(unit.totalCases);

        return unit.save();
      })
      .then(() => {
        console.log("update d successfull");
      })
      .catch((err) => {
        next(err);
      });

    res.status(201).json({
      message: "Update successful",
    });
  };
}

export default UnitController;
