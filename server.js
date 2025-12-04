import "dotenv/config";
import { Telegraf } from "telegraf";
import KING_admins from "./KING_admins.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

// 
bot.on("message", (ctx) => KING_admins(ctx));

bot.launch();
console.log("BOT RUNNING...");
