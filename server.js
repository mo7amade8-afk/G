import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import KING from "./king_admins.js";
import server2 from "./server_2.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// webhook
app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// تشغيل أنظمة البوت
KING(bot);
server2(bot);

// فحص السيرفر
app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT, async () => {
  console.log("🚀 Server running on port", PORT);
  await bot.setWebHook(`${WEBHOOK_URL}/webhook`);
});
