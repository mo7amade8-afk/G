const welcomeDB = new Map();
const ADMIN_ID = Number(process.env.ADMIN_ID);

const replies = [
  "اهلا بك 🙂 مما لا شك انك لست الزعيم كاجينو دي شادو 😮‍💨 يؤسفني قول لك انني لازلت تحت تطوور وهدف 👑 شادو 👑 ان يجعلني اقوا بوت على منصة تليغرام 🔥 سيكون لدي عدة عوامل وقدرات واهداف ومنها حروب ضد عصابات ودردشات مع ضيوفنا الكرام ☺️",
];

async function textHandler(bot, msg) {
  try {
    if (!msg.text || msg.from.id === ADMIN_ID) return;

    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!welcomeDB.has(userId)) {
      welcomeDB.set(userId, true);

      const randomReply =
        replies[Math.floor(Math.random() * replies.length)];

      await bot.sendMessage(chatId, randomReply);
      await bot.sendMessage(chatId, "هل تريدني أن أتوقف عن تكرار الترحيب؟", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "نعم", callback_data: `stop_welcome_${userId}` },
              { text: "لا", callback_data: `continue_welcome_${userId}` },
            ],
          ],
        },
      });
    } else if (welcomeDB.get(userId) === "continue") {
      const randomReply =
        replies[Math.floor(Math.random() * replies.length)];
      await bot.sendMessage(chatId, randomReply);
    }
  } catch (err) {
    console.error("❌ txt_1.js error:", err.message);
  }
}

function handleCallbackQuery(bot) {
  bot.on("callback_query", async (callbackQuery) => {
    try {
      const userId = callbackQuery.from.id;
      const chatId = callbackQuery.message.chat.id;
      const data = callbackQuery.data;

      if (data.startsWith("stop_welcome_")) {
        welcomeDB.set(userId, false);
        await bot.sendMessage(chatId, "تم إيقاف الترحيب");
      } else if (data.startsWith("continue_welcome_")) {
        welcomeDB.set(userId, "continue");
        await bot.sendMessage(chatId, "سيتم الاستمرار في الترحيب");
      }
    } catch (err) {
      console.error("❌ callback_query error:", err.message);
    }
  });
}

export { textHandler, handleCallbackQuery };
