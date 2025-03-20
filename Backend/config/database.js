const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const connectDB = async()=>{
    try
    {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("database is connected successfully....");
    }
    catch(error)
    {
        console.error("error occur on db connection...", error.message);
        process.exit(1);
    }

}


module.exports = connectDB;