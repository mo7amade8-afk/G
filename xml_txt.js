import { decodeXML } from "./xml_decoder.js";

// جلسات المستخدمين
const sessions = new Map();

export default async function adXML(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  // 1️⃣ بدء الأمر
  if (text === "رمح") {
    sessions.set(chatId, { step: "choose" });

    return bot.sendMessage(
      chatId,
      "⚔️ هل تريد فك تشفير XML؟\n\n1️⃣ نعم\n2️⃣ لا"
    );
  }

  const session = sessions.get(chatId);
  if (!session) return;

  // 2️⃣ اختيار نعم / لا
  if (session.step === "choose") {
    if (text === "2") {
      sessions.delete(chatId);
      return bot.sendMessage(chatId, "❌ تم إلغاء العملية");
    }

    if (text === "1") {
      session.step = "wait_xml";
      return bot.sendMessage(
        chatId,
        "📄 أرسل الآن كود XML المشفّر ليتم فك تشفيره"
      );
    }
  }

  // 3️⃣ استقبال XML وفك التشفير
  if (session.step === "wait_xml") {
    try {
      const decoded = await decodeXML(text);
      const output = JSON.stringify(decoded, null, 2);

      // إرسال كنص
      await bot.sendMessage(
        chatId,
        "✅ تم فك تشفير XML بنجاح:\n\n" + output
      );

      // إرسال كملف
      await bot.sendDocument(
        chatId,
        Buffer.from(output),
        {},
        {
          filename: "decoded_xml.json",
          contentType: "application/json"
        }
      );

      sessions.delete(chatId);
    } catch (err) {
      console.error("XML ERROR:", err.message);
      await bot.sendMessage(
        chatId,
        "❌ فشل فك تشفير XML\nتأكد أن الكود صحيح"
      );
    }
  }
    }
