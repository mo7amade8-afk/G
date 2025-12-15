const txt1 = require("./txt1");

module.exports = function textHandler(update) {
  try {

    if (!update.message) return;
    if (!update.message.text) return;


    txt1(update);

  } catch (err) {
    console.error("text.js error:", err.message);
  }
};
