export function initServer2(bot) {
  // الترحيب عند إضافته لأي مجموعة
  bot.on("my_chat_member", async (msg) => {
    try {
      const botId = bot.botInfo.id;
      const chatId = msg.chat.id;

      // تحقق أن البوت تمت إضافته الآن
      if (msg.new_chat_member?.user?.id !== botId) return;
      if ((msg.old_chat_member?.status === "left" || msg.old_chat_member?.status === "kicked") &&
          (msg.new_chat_member?.status === "member" || msg.new_chat_member?.status === "administrator")) {

        const gifUrl = "https://i.ibb.co/Tq4Sj5KT/50574e0daddf43ac4cb8ee584c4d09ae.gif"; // رابط GIF
        const audioUrl = ""; // رابط صوتي
        const captionText = "👋 مرحبًا بالجميع!\nأنا بوت جديد في هذا الجروب 🤖\nسعيد بوجودي معكم 💙";

        // إرسال GIF
        await bot.sendAnimation(chatId, gifUrl, { caption: captionText });

        // إرسال الصوت
        await bot.sendAudio(chatId, audioUrl, { caption: "🎵 استمع إلى هذا الصوت!" });
      }
    } catch (err) {
      console.error("❌ server_2 error:", err.message);
    }
  });
}
