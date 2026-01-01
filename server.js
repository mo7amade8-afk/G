import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { handleMessage } from "./king_admins.js";
import { initServer2 } from "./server_2.js"; // ✅ استدعاء صحيح

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!BOT_TOKEN || !WEBHOOK_URL) {
  console.error("❌ BOT_TOKEN or WEBHOOK_URL is missing!");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// معالجة تحديثات Webhook
app.post("/webhook", async (req, res) => {
  try {
    await bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    res.sendStatus(500);
  }
});

// تمرير الرسائل إلى king_admins
bot.on("message", (msg) => {
  handleMessage(bot, msg);
});

// استدعاء server_2.js لتحديثات الترحيب والصور
initServer2(bot);

app.get("/", (req, res) => {
  res.send("✅ Bot is running with Webhook...");
});

// تشغيل السيرفر وتعيين Webhook
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await bot.setWebHook(`${WEBHOOK_URL}/webhook`);
    console.log(`✅ Webhook set successfully: ${WEBHOOK_URL}/webhook`);
  } catch (err) {
    console.error("❌ Failed to set Webhook:", err.message);
  }
});
