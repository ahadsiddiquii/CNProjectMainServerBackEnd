import mongoose from 'mongoose'

const clinicSchema = mongoose.Schema({
    keyencrypted: String,
    todecrypt: String,
    
});
export default mongoose.model('clinicKeys',clinicSchema);