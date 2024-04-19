import mongoose from 'mongoose';

const {Schema} = mongoose;

const entryDeclarationSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    object: {type: String,},
    gate: {type: String,},
    vehicle : {type: String,},
    vehicleNumber : {type: String, },
    chairNumber : {type: Number, },
    departureDay : {type: Date, },
    entryDate: {type: Date, },
    departureCountry : {type: String, },
    departureProvince : {type: String,},
    destinationCountry : {type: String,},
    passingCountry: {type: String,},
    addressAfterQuarantine: {type: String,},
    fever: {type: Boolean},
    cough: {type: Boolean},
    stuffy: {type: Boolean},
    soreThroat: {type: Boolean},
    nausea: {type: Boolean},
    diarrhea: {type: Boolean},
    hemorrhage: {type: Boolean},
    rash: {type: Boolean},
    vaccinesUsed: {type: String},
    animalContact: {type: Boolean},
    nCoVPContact: {type: Boolean},
    isolationFacility: {type: String},
    negativeConfirmation: {type: Boolean},
    declarationDate : {type: Date, },
})

export default mongoose.model('entrydeclaration', entryDeclarationSchema);