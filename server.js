import "dotenv/config";
import { Telegraf } from "telegraf";
import KING_admin from "./KING_admin.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

// 
bot.on("message", (ctx) => KING_admin(ctx));

bot.launch();
console.log("BOT RUNNING...");
