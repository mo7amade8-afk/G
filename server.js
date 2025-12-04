import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_ID = process.env.TELEGRAM_ID;

// فحص وجود المفاتيح
console.log("BOT_TOKEN Loaded:", BOT_TOKEN ? "تم تشغيل ايها لملك 👑 مارشال دي شادو 👑" : "نيك مو نضام تاع زبي لم يشتغ ثا سييدي 😡");
console.log("TELEGRAM_ID Loaded:", TELEGRAM_ID ? "تم تشغيل ايها لملك 👑 مارشال دي شادو 👑" : "نيك مو نضام تاع زبي لم يشتغ ثا سييدي 😡");

// إنشاء البوت
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// إرسال رسالة بدء للخادم
bot.sendMessage(TELEGRAM_ID, "🔵 Server Started... Bot is Running.");

// استقبال نصوص
bot.on("message", (msg) => {
  if (!msg.text) return;

  bot.sendMessage(TELEGRAM_ID, `📩 Received: ${msg.text}`);
});

// تشغيل خادم وهمي لـ Render
import http from "http";
const PORT = process.env.PORT || 10000;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bot Server Running\n");
  })
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
