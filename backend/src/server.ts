import app from "./app";
import { env } from "@/config/env";
import { prisma } from "@/lib/prisma";

const startServer = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("Đã kết nối PostgreSQL thành công!");

    app.listen(env.port, () => {
      console.log(`Server đang chạy tại http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Lỗi kết nối PostgreSQL:", error);
    process.exit(1);
  }
};

void startServer();
