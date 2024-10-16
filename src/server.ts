import app from "./app";
import connectDb from "./config/database";
import dotenv from "dotenv";
dotenv.config();


const PORT:number = parseInt(process.env.PORT || "5000", 10);

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database', err);
    }
};

startServer();