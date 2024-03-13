import mongoose from 'mongoose';
import user from './user-model.js';

const {Schema} = mongoose;

const personSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    fullName : {type: String, },
    dateOfBirth : {type: Date, },
    Sex : {type: Number, },
    addressCode : {type: String,},
    address : {type: String, },
    nationality : {type: String},
    diseaseStatus : {type: String},
})

export default mongoose.model('personInfo', personSchema);


