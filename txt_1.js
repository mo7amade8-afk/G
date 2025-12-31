const replies = [
  "أهلا 👋",
  "كيفك؟ 😊",
  "مرحبا 🌸",
  "نورت 🤍",
  "أهلا وسهلا!",
  "تشرفنا ✨",
  "كيف الأمور؟",
  "أنا هنا لمساعدتك 💡",
  "شكراً على رسالتك 😄"
];

export default async function textHandler(bot, msg) {
  try {
    if (!msg.text) return; // إذا الرسالة فارغة

    const chatId = msg.chat.id;

    // اختيار رد عشوائي من المصفوفة
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    await bot.sendMessage(chatId, randomReply);

  } catch (err) {
    console.error("txt.js error:", err.message);
  }
}
