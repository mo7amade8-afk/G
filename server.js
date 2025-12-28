import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import KING from "./king_admins.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});


bot.on("message", (msg) => {
  KING(bot, msg);
});


app.get("/", (req, res) => {
  res.send("Bot is running...");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
