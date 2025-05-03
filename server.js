const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const { app: expressApp } = require('express')();
const socketIO = require('socket.io')(server);

app.use(cors());
app.use(express.json());

let users = {};
let messages = {};

app.post('/form', (req, res) => {
  console.log("Форма получена:", req.body);
  res.sendStatus(200);
});

// Получение сообщения от пользователя
app.post('/message', (req, res) => {
  const { userId, text } = req.body;
  if (!messages[userId]) messages[userId] = [];
  messages[userId].push({ from: "user", text });
  res.sendStatus(200);
});

// Отправка сообщения пользователю из админа
app.post('/send', (req, res) => {
  const { userId, text } = req.body;
  if (!messages[userId]) messages[userId] = [];
  messages[userId].push({ from: "admin", text });
  socketIO.to(userId).emit("adminMessage", { text });
  sendTelegramNotification(userId, text);
  res.sendStatus(200);
});

function sendTelegramNotification(userId, message) {
  fetch(`https://api.telegram.org/botВАШ_ТОКЕН/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: userId,
      text: "Вам пришло новое сообщение от нашей команды, посмотрите его!"
    })
  });
}

socketIO.on("connection", (socket) => {
  console.log("Пользователь подключён");

  socket.on("userMessage", (data) => {
    console.log("Сообщение от пользователя:", data);
    socket.join(data.userId);
  });
});

server.listen(3000, () => {
  console.log("Backend запущен на порту 3000");
});
