const socket = io();

const msgWrapper = document.getElementById('msgs-wrapper');
const form = document.getElementById('form');
const input = document.getElementById('msg');
const name = document.getElementById('name');

const appendMsg = ({name, msg}, me = false) => {
    const li = document.createElement('li');
    
    const strong = document.createElement('strong');
    strong.innerText = `${name} `;

    const txt = document.createElement('span');
    txt.innerText = msg;

    if(me) {
        li.classList.add('me');
    }

    li.appendChild(strong);
    li.appendChild(txt);

    msgWrapper.appendChild(li);
}

socket.on('msg', (data) => {
    appendMsg(data);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        msg: input.value,
        name: name.value
    }

    socket.emit('chat', data);
    appendMsg(data, true);

    input.value = '';
});