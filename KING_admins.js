import adminKey from "./admin_key.js";

export default {
  async handle(command) {
    // نمرر الأمر للأسفل (admin_key)
    const result = await adminKey.handle(command);

    // لو مافيه نتيجة → غير معروف
    if (!result) return null;

    return result;
  }
};
