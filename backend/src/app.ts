import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "@/routes/userRoutes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  // mongodb+srv://namtc07wrk_db_user:J2memWT9HsL9gIRb@test.ptx1gfj.mongodb.net/?appName=test
  .connect("mongodb+srv://namtc07wrk_db_user:J2memWT9HsL9gIRb@test.ptx1gfj.mongodb.net/?appName=test")
  .then(() => console.log("Đã kết nối MongoDB thành công!"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Gắn các API routes
app.use("/api", userRoutes);

// Khởi động server
const PORT: number = 8080;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

export default app;
