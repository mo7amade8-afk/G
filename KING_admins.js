import adminKey from "./admin_key.js";

export default {
  async handle(command) {
    try {
      // تحويل الطلب إلى admin_key
      const result = await adminKey.handle(command);
      return result; // يرجع للـ server
    } catch (err) {
      console.log("KING_admins ERROR:", err);
      return null;
    }
  }
};
