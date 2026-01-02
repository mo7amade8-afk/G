export default function Extraction(bot) {
  // قراءة الـ ADMIN_ID من متغير البيئة
  const ADMIN_ID = process.env.ADMIN_ID; // ← ضع ID الحساب في Render

  if (!BOT_ADMIN_ID) {
    console.error("❌ ADMIN_ID غير موجود في متغيرات البيئة!");
    return;
  }

  bot.on("message", async (msg) => {
    if (!msg.reply_to_message) return;
    if (msg.text !== "استخراج") return;

    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // ✅ فحص إذا المرسل هو صاحب البوت
    if (userId.toString() !== ADMIN_ID.toString()) {
      return bot.sendMessage(chatId, "❌ هذا الأمر مخصص لصاحب البوت فقط", {
        reply_to_message_id: msg.message_id
      });
    }

    // ✅ التأكد أن الرد على ملصق
    const sticker = msg.reply_to_message.sticker;
    if (!sticker) {
      return bot.sendMessage(chatId, "❌ رد على ملصق فقط", {
        reply_to_message_id: msg.message_id
      });
    }

    const text = `
🧩 API الملصق:

🆔 file_unique_id:
${sticker.file_unique_id}

📁 file_id:
${sticker.file_id}
`;

    bot.sendMessage(chatId, text, { reply_to_message_id: msg.message_id });
  });
}
