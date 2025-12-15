const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ردود عشوائية
const replies = [
  "أهلا 👋",
  "كيفك؟ 😊",
  "مرحبا 🌸",
  "نورت 🤍",
  "أهلا وسهلا!",
  "تشرفنا ✨",
  "كيف الأمور؟"
];

module.exports = async function txt1(update) {
  try {
    const message = update.message;
    if (!message || !message.text) return;

    const chatId = message.chat.id;

    // اختيار رد عشوائي
    const randomReply =
      replies[Math.floor(Math.random() * replies.length)];

    // إرسال الرد
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: randomReply
    });

  } catch (err) {
    console.error("txt1 error:", err.message);
  }
};
