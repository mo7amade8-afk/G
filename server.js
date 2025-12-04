import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const TOKEN = process.env.BOT_TOKEN;
const USER_ID = process.env.TELEGRAM_ID;
const URL = process.env.RENDER_EXTERNAL_URL;

const bot = new TelegramBot(TOKEN, { webHook: true });
bot.setWebHook(`${URL}/bot${TOKEN}`);

app.use(express.json());

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.on("message", (msg) => {
  if (msg.chat.id.toString() === USER_ID) {
    bot.sendMessage(USER_ID, "تم استلام رسالتك 👌");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
