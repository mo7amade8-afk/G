// src/txt1.js
import axios from "axios";

const TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

async function send(chatId, text) {
  return axios.post(API, {
    chat_id: chatId,
    text
  });
}

export async function handleText(chatId, text, username = "User") {
  if (!text) return null;

  const msg = text.toLowerCase().trim();

  if (msg === "hi" || msg === "hello" || msg === "hlw") {
    return send(chatId, "Hello, Hi, Bye bye. what else you know");
  }

  if (msg === "bot") {
    return send(chatId, "your Mom will enter prefix?");
  }

  if (msg === "morning" || msg === "good morning") {
    return send(chatId, "Hello dear, have a nice day ❤️");
  }

  if (msg === "lol") {
    return send(chatId, "😂");
  }

  if (msg === "owner" || msg === "create you") {
    return send(
      chatId,
      "OWNER: Ratul Hassan\nFacebook: www.facebook.com/MrTomXxX"
    );
  }

  if (msg === "kiss" || msg === "kiss me") {
    return send(chatId, "Ewwww 😾");
  }

  if (msg === "nice" || msg === "thank you") {
    return send(chatId, "yeah im so good you're always welcome");
  }

  if (msg === "how are you") {
    return send(chatId, "Im always good when i see you smiling 😊");
  }

  if (msg === "does the bot love me") {
    return send(chatId, "Yes <3");
  }

  // إذا بدأ الرسالة بكلمة bot
  if (msg.startsWith("bot")) {
    return send(chatId, `${username} 👀`);
  }

  return null; // لا رد
}
