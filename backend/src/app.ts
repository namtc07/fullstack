import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "@/routes/userRoutes";
import { env } from "@/config/env";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(env.mongoUri)
  .then(() => console.log("Đã kết nối MongoDB thành công!"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Gắn các API routes
app.use("/api", userRoutes);

// Khởi động server
app.listen(env.port, () => {
  console.log(`Server đang chạy tại http://localhost:${env.port}`);
});

export default app;
