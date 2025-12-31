import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import KING from "./king_admins.js";

dotenv.config();

const app = express();
app.use(express.json()); // مهم جدًا لقراءة بيانات Webhook

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL; // رابط مشروعك على Render بدون /webhook

// إنشاء البوت بدون polling
const bot = new TelegramBot(BOT_TOKEN);

// معالجة التحديثات القادمة من Webhook
app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// تمرير الرسائل إلى KING
bot.on("message", (msg) => {
  KING(bot, msg);
});

// سيرفر لتأكد أن Render يعمل
app.get("/", (req, res) => {
  res.send("Bot is running with Webhook...");
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
