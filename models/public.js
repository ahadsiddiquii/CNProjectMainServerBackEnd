import mongoose from 'mongoose'

const publicSchema = mongoose.Schema({
    keyencrypted: String,
    todecrypt: String,
    
});
export default mongoose.model('publicKeys',publicSchema);