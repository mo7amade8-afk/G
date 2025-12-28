import textHandler from "./text_1.js";

export default function adText(bot, msg) {
  if (msg.text.startsWith("/")) {
    textHandler(bot, msg);
  }
}
