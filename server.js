const express = require("express");
const expressApp = express();
const axios = require("axios");
const path = require("path");
const port = process.env.PORT || 3000;
expressApp.use(express.static("static"));
expressApp.use(express.json());
const app = express();
require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

app.get("/", (req, res) => {
  res.send("hello world");
});
bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "سلام! به ربات تصویر رنگ هکس کد خوش اومدی. اینجا یه هکس کد بده رنگشو بهت بدم!",
    {}
  );
});

bot.on("text", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    ctx.sendPhoto({
      source: `https://singlecolorimage.com/get/33fd8f/400x100`,
    }),
    {}
  );
});

bot.launch();
