const commands = {
  "جلجامشة": {
    image: "https://example.com/image.jpg",
    caption: "هاذي جلجامشة"
  },
  "صورة": {
    image: "https://example.com/image2.jpg",
    caption: "هاذي صورة"
  }
};

export default async function img1(bot, msg) {
  try {
    if (!msg.text) return;
    const chatId = msg.chat.id;
    const text = msg.text.trim().toLowerCase();

    const commandKey = Object.keys(commands).find(k => k.toLowerCase() === text || k.toLowerCase().includes(text));

    if (!commandKey) {
      console.log("No image command found for:", text);
      return;
    }

    const { image, caption } = commands[commandKey];
    console.log("Sending image:", image);
    await bot.sendPhoto(chatId, image, { caption });
  } catch (err) {
    console.error("img_1 error:", err.message);
    await bot.sendMessage(msg.chat.id, "⚠️ حدث خطأ أثناء إرسال الصورة");
  }
}
