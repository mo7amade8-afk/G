import { textHandler } from "./txt_1.js";

export default async function adText(bot, msg) {
  try {
    if (msg.text) {
      await textHandler(bot, msg);
    }
  } catch (err) {
    console.error("❌ adText error:", err.message);
  }
}
