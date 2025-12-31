import img1 from "./img_1.js";
import img2 from "./img_2.js";
import img3 from "./img_3.js";

export default async function adImg(bot, msg) {

  await img1(bot, msg);
  await img2(bot, msg);
  await img3(bot, msg);
}
