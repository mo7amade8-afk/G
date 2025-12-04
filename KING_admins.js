const KING = require("./KING_admins");
const admin_control = require("./admin_control");
const admin_pas = require("./admin_pas");

function fromKING(msg) {
  console.log("admin_key from KING:", msg);
}

function fromControl(msg) {
  console.log("admin_key from admin_control:", msg);
  KING.fromKey(msg);
}

function fromPas(msg) {
  console.log("admin_key from admin_pas:", msg);
  KING.fromKey(msg);
}

module.exports = {
  fromKING,
  fromControl,
  fromPas
};
