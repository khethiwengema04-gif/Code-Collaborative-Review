import express from "express"
import dotenv from "dotenv"
import { testDbconnection } from "./config/database";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await testDbconnection();
    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });
};
startServer()