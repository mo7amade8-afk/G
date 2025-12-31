const commands = {
  "شيرا": {
    image: "https://i.ibb.co/zhmYHZkp/shi0.jpg",
    caption: "هذه شيرا كان السييد شادو يعتبرها اخته الصغرا وكانو شقيقان لا يفترقان حتا في اصعب ضروف ووقعت شيرا ضحية ومؤامرا لجلجامشة فا اصبحت بيننا حساسيات لذلك ٱطر شادو لحفض صورة اخته لعل تكون هناك مؤامرات اخرا"
  }
};

export default async function img1(bot, msg) {
  try {
    if (!msg.text) return;

    const chatId = msg.chat.id;
    const text = msg.text.trim().toLowerCase(); // تجاهل الفرق بين الحروف الكبيرة والصغيرة

    // البحث عن الأمر بغض النظر عن الحالة
    const commandKey = Object.keys(commands).find(
      k => k.toLowerCase() === text
    );

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
