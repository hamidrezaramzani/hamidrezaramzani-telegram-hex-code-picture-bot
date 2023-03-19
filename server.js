const express = require("express");
const expressApp = express();
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;
expressApp.use(express.static("static"));
expressApp.use(express.json());
const app = express();
require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "سلام! به ربات تصویر رنگ هکس کد خوش اومدی. اینجا یه هکس کد بده رنگشو بهت بدم!",
    {}
  );
});

bot.on("text", (ctx) => {
  bot.telegram.sendPhoto(ctx.chat.id, {
    source: fs.createReadStream(
      "https://singlecolorimage.com/get/33fd8f/800x800"
    ),
  });
});

bot.launch();
