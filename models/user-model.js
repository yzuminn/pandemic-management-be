import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema({
    phoneNumber : {type: String, required: true},
    password : {type: String, required: true},
    type: {type: Number, required: true},
    status : {type: Number, required: true},
    unitCode: {type: String},
    unitDetail: {type: String},
})

export default mongoose.model('User', userSchema);