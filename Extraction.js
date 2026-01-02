export default function Extraction(bot) {

  // ✅ نأخذ ADMIN_ID من environment variables
  const ADMIN_ID = process.env.ADMIN_ID;

  if (!ADMIN_ID) {
    console.warn("⚠️ ADMIN_ID غير محدد في البيئة!");
  }

  bot.on("message", async (msg) => {
    if (!msg.reply_to_message) return;
    if (msg.text !== "استخراج") return;

    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // ✅ فحص إذا المرسل هو صاحب البوت
    if (userId.toString() !== ADMIN_ID) {
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

📦 Sticker Set:
${sticker.set_name || "ملصق خاص"}
    `;

    bot.sendMessage(chatId, text.trim(), {
      reply_to_message_id: msg.message_id
    });
  });

}
