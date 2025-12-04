export function run(cmd) {
  if (cmd === "جلجامشة") {
    return {
      type: "image",
      url: "https://i.ibb.co/cSKV6xVp/gil0.jpg"
    };
  }

  return { error: "unknown image command" };
}

export default { run };
