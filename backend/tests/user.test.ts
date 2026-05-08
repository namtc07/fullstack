import request from "supertest";
import app from "../src/app";
import { PrismaClient } from "@prisma/client";
import { describe, it, expect, afterAll } from "@jest/globals";

const prisma = new PrismaClient();

// describe: Nhóm các kịch bản test có liên quan lại với nhau
describe("Kiểm thử API Người dùng", () => {
  // it: Định nghĩa một kịch bản test cụ thể
  it("Nên đăng ký tài khoản thành công và trả về mã 201", async () => {
    // Giả lập request gửi lên API
    const response = await request(app).post("/api/register").send({
      name: "tester456",
      role: "user",
      password: "password123",
    });

        console.log("CHI TIẾT LỖI 503:", response.body); // THÊM DÒNG NÀY

        expect(response.status).toBe(201);

    // expect: Kỳ vọng kết quả trả về phải khớp 100%
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Đăng ký thành công!");
  });

  // afterAll: Chạy sau khi test xong để ngắt kết nối Database, tránh bị treo Terminal
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Nên lấy được danh sách user khi có token hợp lệ", async () => {
    // 1. Giả lập đăng nhập để xin cấp token
    const loginResponse = await request(app).post("/api/login").send({
      name: "tester456",
      password: "password123",
    });

    const token = loginResponse.body.token; // Trích xuất mã token từ kết quả

    // 2. Dùng token đó để gọi API GET
    const getResponse = await request(app).get("/api/").set("Authorization", `Bearer ${token}`); // Gắn thẻ vào Header y như Postman

    // 3. Kiểm tra kết quả trả về
    expect(getResponse.status).toBe(200);
    expect(Array.isArray(getResponse.body)).toBe(true); // Kỳ vọng danh sách trả về là một mảng
  });
});
