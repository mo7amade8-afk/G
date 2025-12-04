import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
process.removeAllListeners('warning');
dotenv.config();

// الملف الوسيط الرئيسي
import KING from "./KING_admins.js";

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}/`;

// إرسال رسالة
async function sendMessage(chatId, text) {
  await axios.post(API + "sendMessage", {
    chat_id: chatId,
    text: text
  });
}

// إرسال صورة
async function sendPhoto(chatId, url) {
  await axios.post(API + "sendPhoto", {
    chat_id: chatId,
    photo: url
  });
}

app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const msg = req.body.message;
    if (!msg) return;

    const chatId = msg.chat.id;
    const text = msg.text?.trim();

    // أول شيء: نفحص إذا الأمر معروف داخل KING_admins
    const result = await KING.handle(text);

    if (!result) {
      return sendMessage(chatId, "الأمر غير معروف ❌");
    }

    // لو الرد نص
    if (result.type === "text") {
      return sendMessage(chatId, result.data);
    }

    // لو الرد صورة
    if (result.type === "photo") {
      return sendPhoto(chatId, result.data);
    }

  } catch (e) {
    console.log("SERVER ERROR:", e);
  }
});

app.listen(3000, () => {
  console.log("SERVER RUNNING...");
});
