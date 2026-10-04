import express from "express";
import dotenv from "dotenv";
import { testDbconnection } from "./config/database";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import submissionRoutes from "./routes/submissionRoutes";
import commentRoutes from "./routes/commentRoutes";
import reviewRoutes from "./routes/reviewRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/projects', projectRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reviews", reviewRoutes);

const startServer = async () => {
    try {
        await testDbconnection();
        console.log("Database connected successfully.");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

startServer();
