export default function Orders(bot) {
  
  bot.on("message", async (msg) => {
    if (!msg.text) return;
    if (msg.text !== "قائمة_الاوامر") return;

    try {
      // جلب جميع الأوامر المسجلة في البوت
      const commands = await bot.getMyCommands();

      if (!commands || commands.length === 0) {
        return bot.sendMessage(msg.chat.id, "⚠️ لا توجد أوامر مسجلة حالياً.", {
          reply_to_message_id: msg.message_id
        });
      }

      let reply = "📜 قائمة أوامر البوت:\n\n";
      commands.forEach((cmd, index) => {
        reply += `${index + 1}. /${cmd.command} → ${cmd.description || "لا يوجد وصف"}\n`;
      });

      bot.sendMessage(msg.chat.id, reply, {
        reply_to_message_id: msg.message_id
      });

    } catch (err) {
      console.error(err);
      bot.sendMessage(msg.chat.id, "❌ حدث خطأ أثناء جلب الأوامر.", {
        reply_to_message_id: msg.message_id
      });
    }
  });

}
