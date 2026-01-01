export function initServer2(bot) {
  bot.on("my_chat_member", async (msg) => {
    try {
      const chatId = msg.chat.id;
      const botId = bot.botInfo.id;

      // تأكد أن التحديث يخص البوت نفسه
      if (msg.new_chat_member.user.id !== botId) return;

      const oldStatus = msg.old_chat_member.status;
      const newStatus = msg.new_chat_member.status;

      // تم إضافة البوت للتو
      if ((oldStatus === "left" || oldStatus === "kicked") &&
          (newStatus === "member" || newStatus === "administrator")) {

        const gifUrl = "https://i.ibb.co/Tq4Sj5KT/50574e0daddf43ac4cb8ee584c4d09ae.gif";
        const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

        // إرسال صورة GIF ترحيبية
        await bot.sendAnimation(chatId, gifUrl, {
          caption: "👋 مرحبًا بالجميع!\nأنا بوت جديد في هذا الجروب 🤖"
        });

        // إرسال مقطع صوتي ترحيبي
        await bot.sendAudio(chatId, audioUrl, { title: "ترحيب صوتي" });
      }
    } catch (err) {
      console.error("❌ Welcome error:", err.message);
    }
  });
}
