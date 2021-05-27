import mongoose from 'mongoose'

const researchSchema = mongoose.Schema({
    keyencrypted: String,
    todecrypt: String,
    
});
export default mongoose.model('researchKeys',researchSchema);