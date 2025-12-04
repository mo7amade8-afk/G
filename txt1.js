export function run(cmd) {
  if (cmd === "cat") {
    return {
      type: "text",
      content: "Hello from txt1.js"
    };
  }

  return { error: "unknown text command" };
}

export default { run };
