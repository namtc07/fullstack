import express, { Application } from "express";
import cors from "cors";
import userRoutes from "@/routes/userRoutes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Gắn các API routes
app.use("/api", userRoutes);

export default app;
