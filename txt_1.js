const replies = [
  "أهلا 👋",
  "كيفك؟ 😊",
  "مرحبا 🌸",
  "نورت 🤍",
  "أهلا وسهلا!",
  "تشرفنا ✨",
  "كيف الأمور؟"
];

export default async function txt1(bot, msg) {
  try {
    if (!msg.text) return;

    const chatId = msg.chat.id;

    const randomReply =
      replies[Math.floor(Math.random() * replies.length)];

    await bot.sendMessage(chatId, randomReply);

  } catch (err) {
    console.error("txt_1 error:", err.message);
  }
}
