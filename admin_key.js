import adminControl from "./admin_control.js";
import adminPass from "./admin_pas.js";

export default {
  async handle(command) {
    console.log("admin_key received:", command);

    let res;

    res = await adminControl.handle(command);
    if (res) return res;

    res = await adminPass.handle(command);
    if (res) return res;

    return null;
  }
};
