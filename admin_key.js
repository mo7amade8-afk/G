import adminControl from "./admin_control.js";
import adminPas from "./admin_pas.js";

export default {
  async handle(command) {
    try {
      // يرسل الأمر للتحكم الأساسي
      if (adminControl[command]) {
        return await adminControl[command]();
      }

      // أو إذا كان موجود في admin_pas
      if (adminPas[command]) {
        return await adminPas[command]();
      }

      return null;
    } catch (err) {
      console.log("admin_key ERROR:", err);
      return null;
    }
  }
};
