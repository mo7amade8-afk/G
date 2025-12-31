import adText from "./ad_txt.js";
import adImg from "./ad_img.js";
import adVid from "./ad_vid.js";

const ADMIN_ID = process.env.ADMIN_ID; // ضع ايدي الأدمن هنا

export default function KING(bot, msg) {

  if (msg.from.id != ADMIN_ID) return;

  if (msg.text) return adText(bot, msg);
  if (msg.photo) return adImg(bot, msg);
  if (msg.video) return adVid(bot, msg);
}
