from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, CallbackQueryHandler
import os

BOT_TOKEN = 'ВАШ_ТОКЕН_БОТА'
WEBAPP_URL = "https://ваше-имя.github.io/tg-bot-webapp/webapp/index.html"  # Или Replit URL

async def start(update, context):
    user_id = update.effective_user.id
    keyboard = [[InlineKeyboardButton("Открыть форму", url=f"{WEBAPP_URL}?id={user_id}")]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Нажмите кнопку ниже:", reply_markup=reply_markup)

# Запуск бота
app = ApplicationBuilder().token(BOT_TOKEN).build()
app.add_handler(CommandHandler("start", start))
app.run_polling()
