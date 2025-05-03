const params = new URLSearchParams(window.location.search);
const userId = params.get('id');
const socket = io("https://ваш-backend-url.glitch.me"); // или другой хостинг

document.getElementById("myForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  await fetch("https://ваш-backend-url.glitch.me/form", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({userId, data})
  });

  alert("Форма отправлена!");
});

function sendMessage() {
  const text = document.getElementById("msgInput").value;
  socket.emit("userMessage", {userId, text});
}

socket.on("adminMessage", (msg) => {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.innerHTML = `<b>Админ:</b> ${msg.text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
});
