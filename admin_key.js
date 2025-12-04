let callback = null;

export function send(cmd) {
  if (callback) callback(cmd);
}

export function onCommand(fn) {
  callback = fn;
}

import admin_control from "./admin_control.js";
import admin_pas from "./admin_pas.js";

export default { send, onCommand };
