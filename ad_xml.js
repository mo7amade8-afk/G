import { decodeXML } from "./xml_decoder.js";
import fs from "fs-extra";

const sessions = new Map();

export default async function adXML(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (text === "xml") {
    sessions.set(chatId, { step: "wait_xml" });
    return bot.sendMessage(chatId, "📄 أرسل ملف XML الثنائي (أو Base64) ليتم فك تشفيره");
  }

  const session = sessions.get(chatId);
  if (!session) return;

  if (session.step === "wait_xml") {
    try {
      const decoded = await decodeXML(text);
      const output = JSON.stringify(decoded, null, 2);

      await bot.sendMessage(chatId, "✅ تم فك تشفير XML:\n\n" + output);

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
      console.error(err);
      await bot.sendMessage(chatId, "❌ فشل فك تشفير XML\nتأكد أن الملف Binary XML صحيح");
    }
  }
}
