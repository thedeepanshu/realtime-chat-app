const socket = io();

let name;

let textarea = document.querySelector("#textarea");

let messageArea = document.querySelector(".message__area");

const sendBtn = document.querySelector("#sendBtn");

const userInfo = document.querySelector(".userInfo");

// Getting user's name
do {
  name = prompt("Please enter your name: ");
} while (!name);

// Setting username
let nameHead = document.createElement("h2");
let online = document.createElement("div");
online.classList.add("online");
nameHead.innerText = name;
userInfo.appendChild(nameHead);
userInfo.appendChild(online);

// Press button and send message functionality
sendBtn.addEventListener("click", async () => {
  let typedMessage = await textarea.value;
  sendMessage(typedMessage);
});

// Another method to send message by pressing enter key
// textarea.addEventListener("keyup", (e) => {
//   if (e.key === "Enter") {
//     sendMessage(e.target.value);
//   }
// });

//Send message functionality
function sendMessage(message) {
  let msg = {
    username: name,
    message: message.trim(),
  };

  // Append message in frontend
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to server
  socket.emit("message", msg);
}

// Appending messages as child
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
    <h4>${msg.username}</h4>
    <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve message
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
