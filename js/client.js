const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const msg_input = document.getElementById("messageInp")
const msgContainer = document.querySelector('.container')

const append = (msg, position)=> {
    const msgElement = document.createElement('div');
    msgElement.innerText = msg;
    msgElement.classList.add("msg");
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
}

form.addEventListener("submit",  (e)=> {
    e.preventDefault();
    const msg = msg_input.value;
    append(`You: ${msg}`, 'right');
    socket.emit('send', msg);
    msg_input.value = "";
})

const username = prompt("Enter your Name to Join");
socket.emit("new-user-joined", username)

socket.on("user-joined", username=> {
    append(`${username} joined the chat`, 'left')
})


socket.on("send", username=> {
    append(`${username} joined the chat`, 'left')
})


socket.on("receive", data=> {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on("user-left", name=> {
    append(`${name} has left the chat :(`, 'left')
})