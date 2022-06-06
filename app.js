const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

const token = '5511288790:AAGazxrgQfRHHbhTe01PROY2lK_3fdaXNhE';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const cityName = msg.text;

    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {q: cityName, units: 'metric'},
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': '4a7c492bdbmshccbf327531d6b23p13a37fjsn4aa040753e1e'
      }
    };

    const response = await axios.request(options);
    bot.sendMessage(chatId, `В ${response.data.name} ${response.data.main.temp} градусов Цельсия`);
    console.log(response.data);
  });