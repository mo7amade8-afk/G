import img1 from "./img_1.js";
import img2 from "./img_2.js";
import img3 from "./img_3.js";
import entrance from "./entrance.js";

let entranceLoaded = false;

export default async function adImg(bot, msg) {
  // تسجيل حدث الترحيب مرة واحدة فقط
  if (!entranceLoaded) {
    entrance(bot);
    entranceLoaded = true;
  }

  await img1(bot, msg);
  await img2(bot, msg);
  await img3(bot, msg);
}
