import { send } from "./admin_key.js";

export function pass(cmd) {
  send({ pass: cmd });
}

export default { pass };
