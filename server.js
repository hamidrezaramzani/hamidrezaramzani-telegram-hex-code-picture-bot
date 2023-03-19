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

bot.on("text", async (ctx) => {
  const hexCodeRegex = /^#(?:[0-9a-fA-F]{6}){1,2}$/;
  if (!hexCodeRegex.test(ctx.message)) {
    bot.telegram.sendMessage("لطفا یک رنگ کد معتبر وارد کنید ");
  } else {
    try {
      await bot.telegram.sendPhoto(
        ctx.chat.id,
        {
          url: `https://singlecolorimage.com/get/${ctx.message.text.replace(
            "#",
            ""
          )}/800x800`,
        },
        {
          caption: ctx.message,
        }
      );
    } catch (error) {
      bot.telegram.sendMessage(
        ctx.chat.id,
        "خطایی وجود داره!" + String(error),
        {}
      );
    }
  }
});

bot.launch();
