import mongoose from 'mongoose';

const {Schema} = mongoose;

const unitSchema = new Schema({
    unitName: {type: String, required: true},
    unitCode: {type: String, required: true},
    warningLevel: {type: Number},
    totalCases: {type: Number,default: 0},
    totalDeaths: {type: Number,default: 0},
    totalRecovereds: {type: Number,default: 0},
    lastUpdateCases: {type: Number,default: 0},
    lastUpdateDeaths: {type: Number,default: 0},
    lastUpdateRecovereds: {type: Number,default: 0},
    type: {type: String, required: true}
})

export default mongoose.model('Unit', unitSchema);