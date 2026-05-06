const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

const prices = {
  "1 گیگ": "390,000 تومان",
  "2 گیگ": "700,000 تومان",
  "3 گیگ": "990,000 تومان",
  "4 گیگ": "1,260,000 تومان",
  "5 گیگ": "1,500,000 تومان",
  "6 گیگ": "1,740,000 تومان",
  "7 گیگ": "1,960,000 تومان",
  "8 گیگ": "2,160,000 تومان",
  "9 گیگ": "2,340,000 تومان",
  "10 گیگ": "2,500,000 تومان",
  "20 گیگ": "4,600,000 تومان"
};

bot.onText(/\/start/, (msg) => {
  const keyboard = {
    reply_markup: {
      keyboard: [
        ["1 گیگ","2 گیگ"],
        ["3 گیگ","4 گیگ"],
        ["5 گیگ","6 گیگ"],
        ["7 گیگ","8 گیگ"],
        ["9 گیگ","10 گیگ"],
        ["20 گیگ"]
      ],
      resize_keyboard: true
    }
  };

  bot.sendMessage(msg.chat.id, "🔥 خوش اومدی\nحجم رو انتخاب کن 👇", keyboard);
});

bot.on("message", (msg) => {
  if (prices[msg.text]) {
    bot.sendMessage(msg.chat.id,
`✅ سفارش شما: ${msg.text}

💰 قیمت: ${prices[msg.text]}

💳 کارت:
6037-XXXX-XXXX-XXXX
به نام: Mohammad

بعد پرداخت رسید بفرست 🚀`);
  }
});

app.get("/", (req, res) => {
  res.send("Bot is running 🚀");
});

const listener = app.listen(process.env.PORT || 3000);
