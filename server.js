const KING = require("./KING_admins");

KING.fromServer("server started");

module.exports = {
  fromKING: (msg) => {
    console.log("server.js received:", msg);
  }
};
