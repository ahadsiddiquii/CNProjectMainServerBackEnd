import mongoose from 'mongoose'

const patientSchema = mongoose.Schema({
    
    //private
    name: String,
    insuranceplanid: String,

    //private and clinic
    treatmentid: String,
    
    //private, clinic and research
    age: String,    
    
    //private, clinic ,research and public
    disease: String,
    
});
export default mongoose.model('patient',patientSchema);

