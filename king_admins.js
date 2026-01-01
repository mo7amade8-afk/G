import adImg from "./ad_img.js";
import adText from "./ad_txt.js";
import adVid from "./ad_vid.js";

const ADMIN_ID = Number(process.env.ADMIN_ID);

export default function KING(bot) {
  bot.on("message", async (msg) => {
    try {
      if (msg.from.id !== ADMIN_ID) return;

      if (msg.text) {
        await adImg(bot, msg);
        await adVid(bot, msg);
        await adText(bot, msg);
      }

      if (msg.photo) await adImg(bot, msg);
      if (msg.video) await adVid(bot, msg);

    } catch (err) {
      console.error("❌ KING error:", err.message);
    }
  });
}
