import vid1 from "./vid_1.js";

export default async function adVid(bot, msg) {
  try {
    if (msg.video) {
      await vid1(bot, msg);
    }
  } catch (err) {
    console.error("❌ adVid error:", err.message);
  }
}
