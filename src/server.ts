import app from "./app"
import dotenv from "dotenv"
import connectMongoDB from "./infrastructure/database/mongodb/client/mongoose"

dotenv.config()

const PORT = process.env.PORT || 3001



const startServer = async (): Promise<void> => {
    await connectMongoDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();