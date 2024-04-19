import mongoose from 'mongoose';

const {Schema} = mongoose;

const domesticGuestsSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    ismovingThroughTerritory : {type: Boolean, },
    nCoVSignal : {type: Boolean, },
    patientContact : {type: Boolean},
    nCoVConPCountry : {type: Boolean},
    nCoVConPSignal : {type: Boolean},
    declarationDate : {type: Date, },
})

export default mongoose.model('domesticguests', domesticGuestsSchema);