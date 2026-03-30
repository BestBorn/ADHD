#!/usr/bin/env python3
"""
Telegram Bot integrated with Claude AI - Simple version
"""

import os
import logging
from dotenv import load_dotenv
import telebot
from anthropic import Anthropic

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize clients
client = Anthropic()
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
CLAUDE_API_KEY = os.getenv('CLAUDE_API_KEY')

if not TELEGRAM_BOT_TOKEN or not CLAUDE_API_KEY:
    raise ValueError("Missing TELEGRAM_BOT_TOKEN or CLAUDE_API_KEY in .env")

bot = telebot.TeleBot(TELEGRAM_BOT_TOKEN)

# Store conversation history per user
conversations = {}


@bot.message_handler(commands=['start'])
def send_welcome(message):
    """Handle /start command"""
    user_id = message.from_user.id
    conversations[user_id] = []

    welcome = (
        "👋 Hi! I'm a Telegram bot powered by Claude AI.\n\n"
        "Commands:\n"
        "/start - Welcome\n"
        "/clear - Clear history\n"
        "/help - Help\n\n"
        "Just send me any message!"
    )
    bot.reply_to(message, welcome)


@bot.message_handler(commands=['help'])
def send_help(message):
    """Handle /help command"""
    help_text = (
        "I'm Claude, your AI assistant!\n\n"
        "Commands:\n"
        "/start - Welcome message\n"
        "/help - This message\n"
        "/clear - Clear conversation"
    )
    bot.reply_to(message, help_text)


@bot.message_handler(commands=['clear'])
def clear_history(message):
    """Handle /clear command"""
    user_id = message.from_user.id
    conversations[user_id] = []
    bot.reply_to(message, "✅ History cleared!")


@bot.message_handler(func=lambda message: True)
def handle_message(message):
    """Handle all other messages"""
    user_id = message.from_user.id
    user_message = message.text

    # Initialize if needed
    if user_id not in conversations:
        conversations[user_id] = []

    # Add to history
    conversations[user_id].append({
        "role": "user",
        "content": user_message
    })

    try:
        # Get Claude response
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            system="You are a helpful Telegram bot. Keep responses concise and friendly.",
            messages=conversations[user_id]
        )

        assistant_message = response.content[0].text

        # Add to history
        conversations[user_id].append({
            "role": "assistant",
            "content": assistant_message
        })

        # Send response
        bot.reply_to(message, assistant_message)

    except Exception as e:
        logger.error(f"Error: {e}")
        bot.reply_to(message, "❌ Error processing request. Try again!")


if __name__ == '__main__':
    logger.info("🚀 Bot started! Press Ctrl+C to stop.")
    try:
        bot.infinity_polling()
    except KeyboardInterrupt:
        logger.info("Bot stopped.")
