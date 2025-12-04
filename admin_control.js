import image from "./image.js";
import text from "./text.js";
import { send } from "./admin_key.js";

export function controlImage(cmd) {
  send(image.handle(cmd));
}

export function controlText(cmd) {
  send(text.handle(cmd));
}

export default { controlImage, controlText };
