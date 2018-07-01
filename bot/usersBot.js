const TeleBot = require("telebot");
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TeleBot({
  token: "455253269:AAFmPnbqQObrIq6M4t2i71RmJYH-RpLS-6U",
  polling: {
    // Optional. Use polling.
    interval: 1000, // Optional. How often check updates (in ms).
    timeout: 0, // Optional. Update polling timeout (0 - short polling).
    retryTimeout: 3000 // Optional. Reconnecting timeout (in ms).
  },
  allowedUpdates: []
});

module.exports = bot;
