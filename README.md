# Telegram Bot with Claude AI Integration

A Telegram bot powered by Claude AI that responds to messages with intelligent, context-aware replies.

## Features

- 🤖 Claude AI integration for smart responses
- 💬 Conversation history per user
- ⚡ Fast and responsive replies
- 🔄 Multi-user support
- 🧹 Clear conversation history with `/clear` command

## Prerequisites

- Python 3.9+
- Telegram Bot Token (from [@BotFather](https://t.me/botfather))
- Claude API Key (from [Anthropic Console](https://console.anthropic.com))

## Setup

### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd ADHD
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Create .env file

Create a `.env` file in the root directory with your credentials:

```env
TELEGRAM_BOT_TOKEN=your_token_here
CLAUDE_API_KEY=your_api_key_here
```

You can use `.env.example` as a template:
```bash
cp .env.example .env
```

### 3. Run the bot

```bash
python telegram_bot.py
```

The bot will start polling for messages. You should see:
```
Bot started. Press Ctrl+C to stop.
```

## Commands

- `/start` - Show welcome message and initialize conversation
- `/help` - Show help and available commands
- `/clear` - Clear conversation history for current user

## How it works

1. User sends a message to the bot
2. Bot receives the message and adds it to conversation history
3. Bot sends the conversation to Claude AI API
4. Claude AI generates a response
5. Bot sends the response back to the user

## Conversation History

Each user has their own conversation history maintained in memory. This allows Claude to understand context across multiple messages. Use `/clear` to reset the history.

## Error Handling

- If there's an error connecting to Claude API, the bot will notify the user
- Check logs for detailed error information
- Ensure your API key is valid and has appropriate permissions

## License

MIT
