export default function server2(bot) {
  bot.on("my_chat_member", async (msg) => {
    try {
      const botId = bot.botInfo.id;

      // تأكد أن التحديث يخص البوت
      if (msg.new_chat_member.user.id !== botId) return;

      const oldStatus = msg.old_chat_member.status;
      const newStatus = msg.new_chat_member.status;

      if (
        (oldStatus === "left" || oldStatus === "kicked") &&
        (newStatus === "member" || newStatus === "administrator")
      ) {
        const chatId = msg.chat.id;

        // GIF
        await bot.sendAnimation(
          chatId,
          "https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif",
          {
            caption:
              "👋 مرحبًا بالجميع!\n\n" +
              "تمت إضافتي بنجاح 🤖\n" +
              "سعيد بالانضمام إليكم 💙"
          }
        );

        // صوت
        await bot.sendVoice(
          chatId,
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        );
      }
    } catch (err) {
      console.error("❌ server_2 welcome error:", err.message);
    }
  });
}
