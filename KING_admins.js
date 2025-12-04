import admin_key from "./admin_key.js";

export function pushToServer(data) {
  console.log("KING_admins received:", data);
}

admin_key.onCommand((cmd) => {
  pushToServer(cmd);
});
