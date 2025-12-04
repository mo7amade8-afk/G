import dotenv from "dotenv";
dotenv.config();

// قراءة المتغيرات من Render
const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_ID = process.env.TELEGRAM_ID;

// منع ظهور تحذيرات Unhandled Rejection
process.removeAllListeners("warning");

// تشغيل بوت أو النظام الأساسي
import "./KING_admins.js";

console.log("Server started successfully...");
console.log("BOT_TOKEN Loaded:", BOT_TOKEN ? "YES" : "NO");
console.log("TELEGRAM_ID Loaded:", TELEGRAM_ID ? "YES" : "NO");
