import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    await mongoose.connect(process.env["MONGODB_URL"]!)
}

export default connectDB;