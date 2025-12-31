import adText from "./ad_txt.js";
import adImg from "./ad_img.js";
import adVid from "./ad_vid.js";
import adXml from "./ad_xml.js";

const ADMIN_ID = Number(process.env.ADMIN_ID);

export default async function KING(bot, msg) {
  try {
    console.log(
      "📩 From:", msg.from.id,
      "| Text:", msg.text || "—",
      "| Type:",
      msg.photo ? "photo" :
      msg.video ? "video" :
      msg.document ? "document" :
      msg.audio ? "audio" :
      msg.voice ? "voice" :
      msg.animation ? "animation" :
      "text"
    );

    // تحقق من الأدمن
    if (msg.from.id !== ADMIN_ID) {
      console.log("⛔ Not admin, ignored");
      return;
    }

    // 🧠 أوامر XML التفاعلية (أولوية)
    await adXml(bot, msg);

    // 📝 النصوص + أوامر الصور والفيديو
    if (msg.text) {
      await adImg(bot, msg);
      await adVid(bot, msg);
      await adText(bot, msg);
    }

    // 📷 صورة من المستخدم
    if (msg.photo) await adImg(bot, msg);

    // 🎥 فيديو من المستخدم
    if (msg.video) await adVid(bot, msg);

    // 🎵 صوت
    if (msg.audio) await bot.sendAudio(msg.chat.id, msg.audio.file_id);

    // 🎤 رسالة صوتية
    if (msg.voice) await bot.sendVoice(msg.chat.id, msg.voice.file_id);

    // 📄 مستندات
    if (msg.document) await bot.sendDocument(msg.chat.id, msg.document.file_id);

    // 🎞️ GIF / Animation
    if (msg.animation) await bot.sendAnimation(msg.chat.id, msg.animation.file_id);

  } catch (err) {
    console.error("❌ KING error:", err);
    await bot.sendMessage(msg.chat.id, "⚠️ حدث خطأ أثناء معالجة الرسالة");
  }
}
