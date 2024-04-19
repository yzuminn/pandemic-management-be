import mongoose from 'mongoose';
import User from './user-model.js';

const {Schema} = mongoose;

const notificationSchema = new Schema({
    userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
    notificationContent : {type: String},
    title : {type: String},
    status: {type: Number},
    posterName : {type: String},
    time: {type: Date},
})

export default mongoose.model('notification', notificationSchema);
