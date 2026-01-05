const ADMIN_ID = Number(process.env.ADMIN_ID);
const replies = [
  "اهلا بك 🙂 مما لا شك انك لست كاجينو دي شادو مطور البوت 😮‍💨 يؤسفني قول لك ان لبوت لازال تحت تطوور وهدف 👑 شادو 👑 ان يجعله اقوا بوت على منصة تليغرام 🔥 سا يكون بوت له عدت اهداف ومنهم حروب ضد عصابات و منهم دردشات و صور للمستخدمين ضيوفنا الكرام ☺️",
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
