const commands = {
  "جلجامش": {
    video: "https://example.com/gilgamesh.mp4",
    caption: "🎬 ملحمة جلجامش"
  }
};

export default async function vid1(bot, msg) {
  try {
    if (!msg.text) return;

    const chatId = msg.chat.id;
    const text = msg.text.trim();

    if (!commands[text]) return;

    const { video, caption } = commands[text];

    await bot.sendVideo(chatId, video, { caption });
  } catch (err) {
    console.error("vid_1 error:", err.message);
    await bot.sendMessage(msg.chat.id, "⚠️ حدث خطأ أثناء إرسال الفيديو");
  }
}
