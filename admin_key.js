import adminControl from "./admin_control.js";
import adminPass from "./admin_pas.js";

export default {
  handle: async (command) => {
    try {
      console.log("admin_key received:", command);

      // جرب في admin_control
      if (await adminControl.handle(command)) {
        return await adminControl.handle(command);
      }

      // جرب في admin_pass
      if (await adminPass.handle(command)) {
        return await adminPass.handle(command);
      }

      return null;
    } catch (err) {
      console.log("admin_key ERROR:", err);
      return null;
    }
  }
};
