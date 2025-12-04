
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// منع التحذيرات الصفراء
process.removeAllListeners("warning");

// اظهار تحميل المفاتيح
console.log("Server started successfully...");
console.log("BOT_TOKEN Loaded:", process.env.BOT_TOKEN ? "YES" : "NO");
console.log("TELEGRAM_ID Loaded:", process.env.TELEGRAM_ID ? "YES" : "NO");

// مسار فحص التشغيل
app.get("/", (req, res) => {
  res.send("Bot system is running...");
});

// منع الخروج المبكر بإبقاء السيرفر حيًّا
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// لمنع Render من الإغلاق
setInterval(() => {
  console.log("Keep Alive Ping:", new Date().toISOString());
}, 1000 * 60 * 5); // كل 5 دقائق
