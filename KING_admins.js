const server = require("./server");
const admin_key = require("./admin_key");

function fromServer(msg) {
  console.log("KING_admins received:", msg);
  admin_key.fromKING(msg);
}

function fromKey(msg) {
  console.log("KING_admins gets from admin_key:", msg);
  server.fromKING(msg);
}

module.exports = {
  fromServer,
  fromKey
};
