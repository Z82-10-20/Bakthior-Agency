// ESM syntax for importing modules
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Initialize dotenv to use .env file variables
dotenv.config();

// Access environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  // console.error('Polling error:', error.code, error.message);
  // Implement retry logic or handle the error appropriately
  setTimeout(() => {
    bot.startPolling(); // Retry polling (implement with caution to avoid infinite loops)
  }, 10000); // Adjust delay as necessary
});

// Function to send a message to your Telegram
export const sendMessageToTelegram = (message) => {
  bot.sendMessage(chatId, message).then(() => {
    // console.log('Message sent to Telegram successfully.');
  }).catch((error) => {
    // console.error('Error sending message to Telegram:', error);
  });
};

// Example usage moved or used where appropriate
