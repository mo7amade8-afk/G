import adImg from "./ad_img.js";
import adText from "./ad_txt.js";
import adVid from "./ad_vid.js";

const ADMIN_ID = Number(process.env.ADMIN_ID);

export default function KING(bot) {
  bot.on("message", async (msg) => {
    try {
      if (msg.from.id !== ADMIN_ID) return;

      if (msg.text) {
        await adText(bot, msg);
      }

      if (msg.photo) {
        await adImg(bot, msg);
      }

      if (msg.video) {
        await adVid(bot, msg);
      }

      if (msg.document) {
        // يمكنك إضافة دالة لمعالجة الملفات
        await bot.sendDocument(msg.chat.id, msg.document.file_id);
      }

      // لإرسال رسائل نصية
      if (msg.text && msg.text.startsWith("/send")) {
        const chatId = msg.chat.id;
        const messageText = msg.text.split(" ").slice(1).join(" ");
        await bot.sendMessage(chatId, messageText);
      }

      // لإرسال الصور
      if (msg.photo && msg.caption && msg.caption.startsWith("/sendPhoto")) {
        const chatId = msg.chat.id;
        const photoId = msg.photo[msg.photo.length - 1].file_id;
        await bot.sendPhoto(chatId, photoId);
      }

      // لإرسال الفيديو
      if (msg.video && msg.caption && msg.caption.startsWith("/sendVideo")) {
        const chatId = msg.chat.id;
        const videoId = msg.video.file_id;
        await bot.sendVideo(chatId, videoId);
      }
    } catch (err) {
      console.error("❌ KING error:", err.message);
    }
  });
}
