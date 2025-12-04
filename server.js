import express from "express";
import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_ID = process.env.TELEGRAM_ID;

console.log("BOT_TOKEN Loaded:", BOT_TOKEN ? "YES" : "NO");
console.log("TELEGRAM_ID Loaded:", TELEGRAM_ID ? "YES" : "NO");

const bot = new Telegraf(BOT_TOKEN);

// عند وصول رسالة للبوت
bot.on("text", async (ctx) => {
  if (ctx.from.id.toString() !== TELEGRAM_ID) return;
  await ctx.reply("تم استلام رسالتك ✔");
});

// تأكيد استيقاظ السيرفر من Render
app.get("/", (req, res) => {
  res.send("Telegram Bot Server Active ✔");
});

bot.launch();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
