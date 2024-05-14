import mongoose from "mongoose";

let isConnected = false; // track the connection
const MONGODB_URI = "mongodb://10.12.29.68:27017/?directConnection=true";

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "racks",
        })
        isConnected = true;
        console.log("Connected to DB")
    } catch(error) {
        console.log(error);
    }
};