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
import figlet from "figlet";
import cfonts from "cfonts";
import colors from "colors";
import cliTable from "cli-table3";
import Jimp from "jimp";
import sharp from "sharp";
import { translate as gTranslate } from "google-translate-open-api";
import OpenCC from "opencc";

process.env.NODE_NO_WARNINGS = "1";
process.removeAllListeners("warning");
process.on("warning", () => {});
process.on("unhandledRejection", () => {});
process.on("uncaughtException", () => {});

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!BOT_TOKEN || !WEBHOOK_URL) process.exit(1);

const spinner = ora("Starting SHADOW system...").start();
spinner.color = 'magenta';

const bot = new TelegramBot(BOT_TOKEN, { webHook: true });
ffmpeg.setFfmpegPath(ffmpegPath);
new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
new HfInference(process.env.HUGGINGFACE_API_KEY || "");

const SHADOW_BANNER = `
━━━━━━━━━━━━━━━━━━━━
      SHADOW
   SYSTEM ONLINE
━━━━━━━━━━━━━━━━━━━━
`;
console.log(gradient.purple(chalk.bold(SHADOW_BANNER)));
console.log(gradient.rainbow("🚀 Server is booting up..."));
console.log(chalk.cyan(`Port: ${PORT}`));
console.log(chalk.green(`Bot Token Loaded`));
console.log(chalk.yellow(`Webhook URL: ${WEBHOOK_URL}`));

app.get("/", (req, res) => {
  console.log(colors.blue("Received / request"));
  res.json({ status: "OK", system: "SHADOW" });
});

app.get("/health", (req, res) => {
  console.log(colors.green("Health check requested"));
  res.send("healthy");
});

app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  console.log(colors.magenta("Webhook update received"));
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.setWebHook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`)
  .then(() => spinner.succeed(gradient.cyan("Webhook connected successfully")))
  .catch(err => spinner.fail(gradient.red("Webhook failed: " + err.message)));

async function dispatch(ctx) {
  try {
    const r = await KING(ctx, bot);
    if (r?.handled) return;
  } catch (err) {
    console.log(chalk.red("Error in dispatch:"), err.message);
  }
}

bot.on("message", (msg) => {
  console.log(colors.yellow(`Message from ${msg.from.username || msg.from.id}`));
  dispatch({ message: msg });
});

async function translate(text, target = "en") {
  const r = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: JSON.stringify({ q: text, source: "auto", target, format: "text" }),
    headers: { "Content-Type": "application/json" },
  });
  const translated = (await r.json()).translatedText;
  console.log(colors.cyan(`Translated: ${translated}`));
  return translated;
}

function fancy(text) {
  const styled = gradient.rainbow(text);
  console.log(styled);
  return styled;
}

async function imageToText(path) {
  console.log(colors.magenta(`Processing image: ${path}`));
  const r = await Tesseract.recognize(path, "ara+eng");
  console.log(colors.green("Image processed successfully"));
  return r.data.text;
}

async function pdfToText(buffer) {
  console.log(colors.magenta("Processing PDF..."));
  const text = (await pdfParse(buffer)).text;
  console.log(colors.green("PDF processed successfully"));
  return text;
}

const placeholders = ["", "", "", ""];

app.listen(PORT, () => {
  console.log(gradient.rainbow(`Server listening on port ${PORT}`));
});
