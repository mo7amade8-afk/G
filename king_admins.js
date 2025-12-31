import adText from "./ad_txt.js";
import adImg from "./ad_img.js";
import adVid from "./ad_vid.js";

const ADMIN_ID = Number(process.env.ADMIN_ID);

export default async function KING(bot, msg) {
  console.log("Received message from:", msg.from.id, "Type:", msg.type, "Text:", msg.text);

  // تحقق من الأدمن
  if (msg.from.id !== ADMIN_ID) {
    console.log("User is not admin, ignoring message.");
    return;
  }

  try {
    // نصوص وأوامر صور وفيديوهات
    if (msg.text) {
      // أوامر الصور أولاً
      await adImg(bot, msg);
      // أوامر الفيديوهات
      await adVid(bot, msg);
      // النصوص العادية
      await adText(bot, msg);
    }

    // صورة من المستخدم
    if (msg.photo) {
      console.log("Photo received, forwarding...");
      await adImg(bot, msg);
    }

    // فيديو من المستخدم
    if (msg.video) {
      console.log("Video received, forwarding...");
      await adVid(bot, msg);
    }

    // مقطع صوتي
    if (msg.audio) {
      console.log("Audio received, forwarding...");
      await bot.sendAudio(msg.chat.id, msg.audio.file_id);
    }

    // ملاحظة: Telegram يدعم ملفات متنوعة عبر msg.document
    if (msg.document) {
      console.log("Document received, forwarding...");
      await bot.sendDocument(msg.chat.id, msg.document.file_id);
    }

    // ملفات صوتية إضافية (Voice messages)
    if (msg.voice) {
      console.log("Voice message received, forwarding...");
      await bot.sendVoice(msg.chat.id, msg.voice.file_id);
    }

    // ملفات فيديو بصيغة GIF أو فيديو قصير (animation)
    if (msg.animation) {
      console.log("Animation received, forwarding...");
      await bot.sendAnimation(msg.chat.id, msg.animation.file_id);
    }

  } catch (err) {
    console.error("Error in KING handler:", err.message);
    await bot.sendMessage(msg.chat.id, "⚠️ حدث خطأ أثناء معالجة الرسالة");
  }
}
