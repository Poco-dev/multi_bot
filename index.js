const { Telegraf } = require("telegraf");
const getChatCompletion = require("./ai.js"); // Подключаем функцию
const saveMessage = require("./mongo.js");
const getWeather = require("./weather.js");
const getCatPhoto = require("./cat.js");

const bot = new Telegraf(""); // Замените на свой токен

bot.command("start", (ctx) => {
  ctx.reply("Добро пожаловать в WebAppTrainingBot!", {
    reply_markup: {
      keyboard: [
        [
          { text: "Узнать погоду", request_location: true },
          { text: "Фото кота" },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.hears("Фото кота", async (ctx) => {
  const photourl = await getCatPhoto();
  ctx.replyWithPhoto({ url: photourl }, { caption: "Вот ваше фото! 🐱" });
});

bot.on("text", async (ctx) => {
  let response = await getChatCompletion(ctx.update.message.text);
  ctx.reply(response);
});

bot.on("location", async (ctx) => {
  const weather = await getWeather(ctx);
  const message = `${weather.location.country} ${weather.location.region} ${weather.location.name}\n${weather.location.localtime}`;
  ctx.reply(message);
});

bot.on("text", async (ctx) => {
  const message = {
    user_id: ctx.update.message.from.id,
    username: ctx.update.message.from.username,
    message: ctx.update.message.text,
    chat_id: ctx.update.message.chat.chat_id,
  };
  try {
    await saveMessage(message);
    ctx.reply("Message saved");
  } catch (error) {
    console.log(error);
  }
});

bot.telegram.setMyCommands([
  { command: "start", description: "Начать пользование" },
]);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
