/* eslint-disable no-undef */
import mongoose from "mongoose";

let connected =false

const connectDB =async()=>{
    mongoose.set('strictQuery',true);


    //If the DB is already connected, dont connect it again
    if(connected){
        console.log("MongoDB is already connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected =true
        console.log("Mongo DB Connected")

    } catch (error) {
        console.log(error)
    }


}


export default connectDB