const TeleBot = require("telebot");
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TeleBot({
  token: "578467308:AAHkO_5m9WGW6iLSfEcrXFU9Rz-GsaSBtsU",
  polling: {
    // Optional. Use polling.
    interval: 1000, // Optional. How often check updates (in ms).
    timeout: 0, // Optional. Update polling timeout (0 - short polling).
    retryTimeout: 3000 // Optional. Reconnecting timeout (in ms).
  },
  allowedUpdates: []
});

bot.on("text", msg => {
  console.log(msg.text);
  const currency = msg.text.split("\n")[0].substr(1);
  const buy = { value: null };
  const sell = { value: null };
  const arr = msg.text
    .split("\n")
    .slice(1)
    .map((item, index) => {
      const type = item.split(" ")[0].toLowerCase();
      if (type === "buy") {
        buy.value = item.split(" ")[1];
      } else {
        sell.value = item.split(" ")[1];
      }
      return item.split(" ")[1];
    });
  let resultArr = [];
  resultArr = [currency, buy.value, sell.value];
  // resultArr.unshift(currency);
  // trade placing service
  const { User } = require("./../models");
  User.findAll({
    attributes: ["id", "apiKey", "secretKey"],
    where: {
      status: "1"
    }
  })
    .then(response => {
      const result = JSON.parse(JSON.stringify(response));
      console.log(resultArr, result);
    })
    .catch(err => {
      console.log(err);
    });
});

bot.start();

module.exports = bot;
