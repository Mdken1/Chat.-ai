// const input = document.getElementById("message-input");
// const sendBtn = document.getElementById("send-btn");
// const chatBox = document.getElementById("chat-box");

// sendBtn.addEventListener("click", sendMessage);
// input.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") sendMessage();
// });

// function sendMessage() {
//   const msg = input.value.trim();
//   if (msg === "") return;
  
//   appendMessage(msg, "user");
//   input.value = "";
//   setTimeout(() => {
//     appendMessage("Typing...", "bot");
//     setTimeout(() => {
//         document.querySelector(".bot:last-child").innerText = "This is a bot reply.";
//     }, 1000);
//   }, 500);
// }

// function appendMessage(text, type) {
//   const msgDiv = document.createElement("div");
//   msgDiv.className = message ${type};
//   msgDiv.innerText = text;
//   chatBox.appendChild(msgDiv);
//   chatBox.scrollTop = chatBox.scrollHeight;
// }



const input = document.getElementById('input');
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const imgBtn = document.getElementById('imgBtn');
const imageUpload = document.getElementById('imageUpload');

// Send text
sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage('user', text);
  input.value = '';
  setTimeout(() => {
    botReply("I'm just a demo bot 🧠");
  }, 600);
};

// Add message to DOM
function addMessage(sender, text, isImage = false) {
  const msgDiv = document.createElement('div');
//   msgDiv.className = message ${sender};
msgDiv.className = `message ${sender}`;
// filepath: c:\Users\Kenneth David\Desktop\ALL MY OLD HARD DRIVE WORK\DESKTOP BACK UP\All My Projects ex\All My Projects\Whatsapp pro\script.js
  const span = document.createElement('span');
  if (isImage) {
    const img = document.createElement('img');
    img.src = text;
    img.style.maxWidth = '140px';
    img.style.borderRadius = '10px';
    span.appendChild(img);
  } else {
    span.innerText = text;
  }
  const avatar = document.createElement('img');
  avatar.src = sender === 'user' ? 'user.jpg' : 'bot.jpg';
  avatar.className = 'avatar';
  if (sender === 'user') {
    msgDiv.append(span, avatar);
  } else {
    msgDiv.append(avatar, span);
  }
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Bot response
function botReply(msg) {    
    addMessage('bot', msg);
}

// Voice input
micBtn.onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    input.value = text;
    sendBtn.click();
  };
};

// Image upload
imgBtn.onclick = () => imageUpload.click();

imageUpload.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    addMessage('user', reader.result, true);
    botReply('Searching the image... (not functional yet)');
  };
  reader.readAsDataURL(file);
};
