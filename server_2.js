export default function server2(bot) {

  bot.on("message", async (msg) => {

    // 🟢 حدث إضافة أعضاء جدد
    if (msg.new_chat_members) {

      for (const member of msg.new_chat_members) {

        // 🔥 فقط عندما يتم إضافة البوت نفسه
        if (member.is_bot && member.username === bot.username) {

          const chatId = msg.chat.id;

          // صورة GIF
          await bot.sendAnimation(
            chatId,
            "https://i.ibb.co/Tq4Sj5KT/50574e0daddf43ac4cb8ee584c4d09ae.gif",
            {
              caption: "👋 مرحبًا! تم تفعّيلي بنجاح\n🚀 أنا جاهز للعمل"
            }
          );

          // مقطع صوتي
          await bot.sendAudio(
            chatId,
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          );
        }
      }
    }
  });
}
