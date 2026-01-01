export default function server2(bot) {
  console.log("✅ server_2.js loaded");

  bot.on("my_chat_member", async (msg) => {
    try {
      const botId = bot.botInfo.id;

      // تأكد أن التحديث يخص البوت نفسه
      if (msg.new_chat_member.user.id !== botId) return;

      const oldStatus = msg.old_chat_member.status;
      const newStatus = msg.new_chat_member.status;

      // تمت إضافته الآن
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
              "👋 مرحبًا بالجميع!\n" +
              "أنا بوت جديد في هذه المجموعة 🤖\n" +
              "سعيد بوجودي معكم 💙"
          }
        );

        // صوت
        await bot.sendVoice(
          chatId,
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        );

        console.log("✅ Welcome message sent");
      }
    } catch (err) {
      console.error("❌ Welcome error:", err.message);
    }
  });
}
