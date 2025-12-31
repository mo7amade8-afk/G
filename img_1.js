const commands = {
  "جلجامشة": {
    image: "https://i.ibb.co/cSKV6xVp/gil0.jpg",
    caption: " هاذي جلجامشة القحبة 🐸🍻"
  }
};

export default async function img1(bot, msg) {
  try {
    if (!msg.text) return;

    const chatId = msg.chat.id;
    const text = msg.text.trim();

    if (!commands[text]) return;

    const { image, caption } = commands[text];

    await bot.sendPhoto(chatId, image, { caption });
  } catch (err) {
    console.error("img_1 error:", err.message);
    await bot.sendMessage(msg.chat.id, "⚠️ حدث خطأ أثناء إرسال الصورة");
  }
}
