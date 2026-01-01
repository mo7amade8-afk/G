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
  console.error("❌ BOT_TOKEN أو WEBHOOK_URL غير موجودين");
  process.exit(1);
}

// إنشاء البوت (Webhook فقط)
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

/* =========================
   📥 Webhook
   ========================= */
app.post("/webhook", async (req, res) => {
  try {
    await bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    res.sendStatus(500);
  }
});

/* =========================
   🧠 رسائل (إدارية)
   ========================= */
bot.on("message", async (msg) => {
  console.log("📩 Message:", msg.chat.id);
  await KING(bot, msg);
});

/* =========================
   🤖 تحميل السيرفر الثاني
   ========================= */
server2(bot);

/* =========================
   🌐 فحص
   ========================= */
app.get("/", (req, res) => {
  res.send("✅ Main server running");
});

/* =========================
   🚀 تشغيل + Webhook
   ========================= */
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await bot.setWebHook(`${WEBHOOK_URL}/webhook`, {
      allowed_updates: ["message", "my_chat_member"]
    });
    console.log("✅ Webhook set");
  } catch (err) {
    console.error("❌ Failed to set Webhook:", err.message);
  }
});
