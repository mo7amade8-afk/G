export default function welcomeOnAdd(bot) {
  bot.on("my_chat_member", async (msg) => {
    try {
      const chatId = msg.chat.id;
      const newStatus = msg.new_chat_member.status;
      const oldStatus = msg.old_chat_member.status;

      // تأكد أن التغيير يخص البوت نفسه
      const botId = bot.botInfo.id;
      if (msg.new_chat_member.user.id !== botId) return;

      // تم إضافة البوت الآن
      if (
        (oldStatus === "left" || oldStatus === "kicked") &&
        (newStatus === "member" || newStatus === "administrator")
      ) {
        const gifUrl = "https://i.ibb.co/Tq4Sj5KT/50574e0daddf43ac4cb8ee584c4d09ae.gif"; // رابط مباشر GIF

        await bot.sendAnimation(chatId, gifUrl, {
          caption:
            "👋 مرحبًا بالجميع!\n\n" +
            "أنا بوت جديد في هذا الجروب 🤖\n" +
            "سعيد بوجودي معكم 💙"
        });
      }
    } catch (err) {
      console.error("❌ Welcome error:", err.message);
    }
  });
    }
