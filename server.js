import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import KING from "./king_admins.js";
import server2 from "./server_2.js"; // ملف إضافي للتحكم أو وظائف ثانية

dotenv.config();

const app = express();
app.use(express.json()); // مهم جدًا لقراءة بيانات Webhook

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL; // رابط مشروعك على Render بدون /webhook

// إنشاء البوت بنظام Webhook فقط
const bot = new TelegramBot(BOT_TOKEN, { webHook: true });

// تمرير التحديثات القادمة من Webhook إلى king_admins
bot.on("message", (msg) => {
  console.log("📩 Message received:", msg.text || msg);
  KING(bot, msg);
});

// تمرير التحديثات إلى server_2.js لو فيه أي وظيفة إضافية
bot.on("message", (msg) => {
  server2(bot, msg);
});

// معالجة التحديثات القادمة من Webhook
app.post("/webhook", (req, res) => {
  try {
    bot.processUpdate(req.body);
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
  }
  res.sendStatus(200);
});

// سيرفر للتأكد أن Render يعمل
app.get("/", (req, res) => {
  res.send("🤖 Bot is running with Webhook...");
});

// تشغيل السيرفر وتعيين Webhook تلقائيًا
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await bot.setWebHook(`${WEBHOOK_URL}/webhook`);
    console.log(`✅ Webhook set: ${WEBHOOK_URL}/webhook`);
  } catch (err) {
    console.error("❌ Failed to set Webhook:", err.message);
  }
});
