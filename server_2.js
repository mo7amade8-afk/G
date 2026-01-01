bot.on("chat_member", async (msg) => {
  try {
    const chatId = msg.chat.id;
    const botId = bot.botInfo.id;

    // تحقق أن البوت تمت إضافته
    if (msg.new_chat_member.user.id !== botId) return;

    const oldStatus = msg.old_chat_member.status;
    const newStatus = msg.new_chat_member.status;

    if ((oldStatus === "left" || oldStatus === "kicked") &&
        (newStatus === "member" || newStatus === "administrator")) {

      // إرسال GIF
      await bot.sendAnimation(chatId,
        "https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif",
        { caption: "👋 مرحبًا بالجميع! أنا بوت جديد 🤖" }
      );

      // إرسال مقطع صوتي
      await bot.sendAudio(chatId,
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        { caption: "🎵 مقطع ترحيبي" }
      );

      // رسالة نصية إضافية
      await bot.sendMessage(chatId, "✨ سعيد بوجودي معكم 💙");
    }

  } catch (err) {
    console.error("Welcome error:", err.message);
  }
});
