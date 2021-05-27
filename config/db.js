import mongoose from 'mongoose'
import config from 'config'

const connection_url = config.get("mongoURI");

const connectDB = async () => {
    try{
        await mongoose.connect(connection_url, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true,
        });
        console.log("MongoDB Connected");
    }catch (err){
        console.error(err.message);
        process.exit(1);
    }
};
export default connectDB;


