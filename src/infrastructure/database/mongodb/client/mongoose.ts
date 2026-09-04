import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
    await mongoose.connect(process.env["MONGODB_URL"]!)
}

export default connectMongoDB;