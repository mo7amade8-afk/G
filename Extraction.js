bot.on("message", async (msg) => {
  if (!msg.reply_to_message) return;
  if (msg.text !== "استخراج") return;

  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // ✅ فحص هل المرسل أدمن
  try {
    const member = await bot.getChatMember(chatId, userId);

    if (
      member.status !== "administrator" &&
      member.status !== "creator"
    ) {
      return bot.sendMessage(chatId, "❌ هذا الأمر مخصص للأدمن فقط", {
        reply_to_message_id: msg.message_id
      });
    }
  } catch (e) {
    return;
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
