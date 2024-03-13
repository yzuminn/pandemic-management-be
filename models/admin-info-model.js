import mongoose from 'mongoose';

const {Schema} = mongoose;

// co the dung model.discrimination() de ke thua-
const adminSchema = new Schema({
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

export default mongoose.model('adminInfo', adminSchema);
