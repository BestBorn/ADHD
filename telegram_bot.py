#!/usr/bin/env python3
"""
Telegram Bot integrated with Claude AI
"""

import os
import logging
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from anthropic import Anthropic

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Initialize Anthropic client
client = Anthropic()

# Store conversation history per user
conversations = {}

TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
CLAUDE_API_KEY = os.getenv('CLAUDE_API_KEY')

if not TELEGRAM_BOT_TOKEN or not CLAUDE_API_KEY:
    raise ValueError("Missing TELEGRAM_BOT_TOKEN or CLAUDE_API_KEY in environment variables")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when /start is issued."""
    user_id = update.effective_user.id
    conversations[user_id] = []

    welcome_message = (
        "👋 Hello! I'm a Telegram bot powered by Claude AI.\n\n"
        "Just send me any message and I'll respond with the power of AI!\n\n"
        "Commands:\n"
        "/start - Show this welcome message\n"
        "/clear - Clear conversation history\n"
        "/help - Show help message"
    )
    await update.message.reply_text(welcome_message)


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when /help is issued."""
    help_text = (
        "I'm Claude, an AI assistant integrated with Telegram.\n\n"
        "How to use:\n"
        "1. Send me any question or message\n"
        "2. I'll respond using Claude AI\n"
        "3. Use /clear to reset conversation history\n\n"
        "Commands:\n"
        "/start - Welcome message\n"
        "/help - This message\n"
        "/clear - Clear chat history"
    )
    await update.message.reply_text(help_text)


async def clear_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Clear conversation history for the user."""
    user_id = update.effective_user.id
    conversations[user_id] = []
    await update.message.reply_text("✅ Conversation history cleared!")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle incoming messages and respond with Claude."""
    user_id = update.effective_user.id
    user_message = update.message.text

    # Initialize conversation history if not exists
    if user_id not in conversations:
        conversations[user_id] = []

    # Add user message to history
    conversations[user_id].append({
        "role": "user",
        "content": user_message
    })

    # Show typing indicator
    await update.message.chat.send_action("typing")

    try:
        # Get response from Claude
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            system="You are a helpful Telegram bot. Keep responses concise and friendly. If the message is very long, summarize it.",
            messages=conversations[user_id]
        )

        assistant_message = response.content[0].text

        # Add assistant response to history
        conversations[user_id].append({
            "role": "assistant",
            "content": assistant_message
        })

        # Send response to user
        await update.message.reply_text(assistant_message)

    except Exception as e:
        logger.error(f"Error getting response from Claude: {e}")
        await update.message.reply_text(
            "❌ Sorry, I encountered an error processing your request. Please try again."
        )


def main() -> None:
    """Start the bot."""
    # Create the Application
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    # Register handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("clear", clear_command))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # Run the bot
    logger.info("Bot started. Press Ctrl+C to stop.")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()
