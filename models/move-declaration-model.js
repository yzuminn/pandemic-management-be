import mongoose from 'mongoose';

const {Schema} = mongoose;

const moveDeclarationSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    vehicle : {type: String,},
    vehicleNumber : {type: String, },
    chairNumber : {type: Number, },
    departureDay : {type: Date, },
    departureAddress : {type: String, },
    arrivalAddress : {type: String,},
    ismovingThroughTerritory : {type: Boolean, },
    nCoVSignal : {type: Boolean, },
    patientContact : {type: Boolean},
    nCoVConPCountry : {type: Boolean},
    nCoVConPSignal : {type: Boolean},
    declarationDate : {type: Date, },
})

export default mongoose.model('domesticmovedeclaration', moveDeclarationSchema);