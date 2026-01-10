process.env.NODE_NO_WARNINGS = "1";

import express from "express";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import chalk from "chalk";
import gradient from "gradient-string";
import ora from "ora";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import Tesseract from "tesseract.js";
import pdfParse from "pdf-parse";
import fetch from "node-fetch";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HfInference } from "@huggingface/inference";
import KING from "./king_admins.js";

/* placeholders لإضافة ملفات لاحقًا */
const placeholders = [
  "", // ملف 1
  "", // ملف 2
  "", // ملف 3
  "", // ملف 4
];

process.removeAllListeners("warning");
process.on("warning", () => {});

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!BOT_TOKEN || !WEBHOOK_URL) process.exit(1);

const spinner = ora("Starting SHADOW system...").start();

const bot = new TelegramBot(BOT_TOKEN);

await bot.setWebHook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`);

spinner.succeed("Webhook connected");

const SHADOW_BANNER = `
━━━━━━━━━━━━━━━━━━━━
      SHADOW
   SYSTEM ONLINE
━━━━━━━━━━━━━━━━━━━━
`;

console.log(
  gradient.multiline(gradient.purple)(
    chalk.bold(SHADOW_BANNER)
  )
);

app.get("/", (req, res) => {
  res.json({ status: "OK", system: "SHADOW" });
});

app.get("/health", (req, res) => {
  res.send("healthy");
});

app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

ffmpeg.setFfmpegPath(ffmpegPath);

new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
new HfInference(process.env.HUGGINGFACE_API_KEY || "");

async function dispatch(ctx) {
  try {
    const r = await KING(ctx, bot);
    if (r?.handled) return;
    /* هنا لاحقًا يمكنك التعامل مع placeholders أو أي ملفات أخرى */
  } catch {}
}

bot.on("message", (msg) => {
  dispatch({ message: msg });
});

async function translate(text, target = "en") {
  const r = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: "auto",
      target,
      format: "text",
    }),
    headers: { "Content-Type": "application/json" },
  });
  const j = await r.json();
  return j.translatedText;
}

function fancy(text) {
  return gradient.rainbow(text);
}

async function imageToText(path) {
  const r = await Tesseract.recognize(path, "ara+eng");
  return r.data.text;
}

async function pdfToText(buffer) {
  const d = await pdfParse(buffer);
  return d.text;
}

process.on("unhandledRejection", () => {});
process.on("uncaughtException", () => {});

app.listen(PORT, () => {});
