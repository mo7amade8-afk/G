import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL; // رابط مشروعك على Render بدون /webhook

// إنشاء البوت بنظام Webhook
const bot = new TelegramBot(BOT_TOKEN, { webHook: true });

// الرابط المباشر للـ GIF الترحيبي
const WELCOME_GIF = "https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif";

// الرابط المباشر للصوت الترحيبي (مثال: MP3)
const WELCOME_AUDIO = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// دالة الترحيب التلقائي عند إضافة البوت للجروب
async function welcome(bot, msg) {
  try {
    const chatId = msg.chat.id;
    const newStatus = msg.new_chat_member.status;
    const oldStatus = msg.old_chat_member.status;

    // تأكد أن البوت نفسه تمت إضافته
    const botId = bot.botInfo.id;
    if (msg.new_chat_member.user.id !== botId) return;

    if (
      (oldStatus === "left" || oldStatus === "kicked") &&
      (newStatus === "member" || newStatus === "administrator")
    ) {
      // إرسال GIF
      await bot.sendAnimation(chatId, WELCOME_GIF, {
        caption: "👋 مرحبًا بالجميع!\nأنا بوت جديد في هذا الجروب 🤖\nسعيد بوجودي معكم 💙"
      });

      // إرسال رسالة نصية إضافية (اختياري)
      await bot.sendMessage(chatId, "✨ يمكنكم الآن التفاعل معي.");

      // إرسال الصوت الترحيبي
      await bot.sendAudio(chatId, WELCOME_AUDIO, {
        caption: "🎵 هذا ترحيب موسيقي من البوت!"
      });
    }
  } catch (err) {
    console.error("Welcome error:", err.message);
  }
}

// الاستماع لتحديثات my_chat_member
bot.on("my_chat_member", welcome);

// Webhook endpoint
app.post("/webhook", (req, res) => {
  try {
    bot.processUpdate(req.body);
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
  }
  res.sendStatus(200);
});

// تحقق أن السيرفر يعمل
app.get("/", (req, res) => {
  res.send("🤖 Welcome bot is running with Webhook...");
});

// تشغيل السيرفر وضبط Webhook
app.listen(PORT, async () => {
  console.log(`🚀 Welcome server running on port ${PORT}`);
  try {
    await bot.setWebHook(`${WEBHOOK_URL}/webhook`);
    console.log(`✅ Webhook set: ${WEBHOOK_URL}/webhook`);
  } catch (err) {
    console.error("❌ Failed to set Webhook:", err.message);
  }
});
