const express = require("express");
const expressApp = express();
expressApp.use(express.static("static"));
expressApp.use(express.json());
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
  const hexCodeRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  if (!hexCodeRegex.test(ctx.message.text.trim())) {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "لطفا یک رنگ کد معتبر وارد کنید ",
      {}
    );
  } else {
    const hexCode = ctx.message.text.replace("#", "");
    let finalHexCode = hexCode;
    if (hexCode.length === 3) {
      let seperatedHexCode = hexCode.split("");
      let finalHexCodeString = "";
      seperatedHexCode.forEach((letter) => {
        finalHexCodeString += letter + letter;
      });
      finalHexCode = finalHexCodeString;
    }
    await bot.telegram.sendPhoto(
      ctx.chat.id,
      {
        url: `https://singlecolorimage.com/get/${finalHexCode}/800x800`,
      },
      {
        caption: ctx.message,
      }
    );
  }
});
bot.launch({
  webhook: {
    domain: `https://telegram-hex-code-picture-bot.vercel.app/`,
  },
});
