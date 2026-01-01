import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import KING from "./king_admins.js";
import server2 from "./server_2.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!BOT_TOKEN || !WEBHOOK_URL) {
  console.error("❌ BOT_TOKEN أو WEBHOOK_URL غير موجود");
  process.exit(1);
}

// إنشاء البوت Webhook فقط
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

/* استقبال تحديثات تيليغرام */
app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

/* ربط الأنظمة */
KING(bot);      // أوامر الأدمن + الصور
server2(bot);   // الترحيب عند الإضافة

/* فحص السيرفر */
app.get("/", (req, res) => {
  res.send("✅ Bot is running");
});

/* تشغيل + تعيين Webhook */
app.listen(PORT, async () => {
  console.log(`🚀 Server running on ${PORT}`);

  await bot.setWebHook(`${WEBHOOK_URL}/webhook`, {
    allowed_updates: ["message", "my_chat_member"]
  });

  console.log("✅ Webhook set correctly");
});
