const text = require("./text");
const image = require("./image");

module.exports = function adminControl(update) {
  try {
    if (!update.message) return;

    // رسالة نصية
    if (update.message.text) {
      text(update);
      return;
    }

    // صورة
    if (update.message.photo) {
      image(update);
      return;
    }

  } catch (err) {
    console.error("admin_control error:", err.message);
  }
};
