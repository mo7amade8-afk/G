import txt1 from "./txt_1.js";

export default async function adText(bot, msg) {
  try {
    if (msg.text) {
      await txt1(bot, msg);
    }
  } catch (err) {
    console.error("❌ adText error:", err.message);
  }
}
