import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nMongoDB Connected || DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGO ERROR: ", error);
        process.exit(1);
    }
}

export default connectDB;