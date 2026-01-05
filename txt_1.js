const ADMIN_ID = Number(process.env.ADMIN_ID);
const replies = [
  "اهلا بك 🙂 مما لا شك انك لست الزعيم كاجينو دي شادو 😮‍💨 يؤسفني قول لك انني لازلت تحت تطوور وهدف 👑 شادو 👑 ان يجعلني اقوا بوت على منصة تليغرام 🔥 سا يكون لدي عدت عوامل وقدرات واهداف ومنهم حروب ضد عصابات و منهم دردشات معى ضيوفنا الكرام ☺️",
];

export default async function textHandler(bot, msg) {
  try {
    if (!msg.text || msg.from.id === ADMIN_ID) return;
    const chatId = msg.chat.id;
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    await bot.sendMessage(chatId, randomReply);
  } catch (err) {
    console.error("txt.js error:", err.message);
  }
}
