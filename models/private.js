import mongoose from 'mongoose'

const privateSchema = mongoose.Schema({
    keyencrypted: String,
    todecrypt: String,
    
});
export default mongoose.model('privateKeys',privateSchema);