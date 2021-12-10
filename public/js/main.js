const socket = io();
const chatMessage = document.getElementById('chat-form');
const messagesBox = document.querySelector('.chat-messages')

// get username and room from URL
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix : true
})
//join room 
socket.emit('joinRoom',{username,room});

//output username
socket.on('userInThisRoom',({room,users})=>{
    console.log(room);
    console.log(users);
})

socket.on('message',message =>{
    outputMessage(message);
    //scroll down
    messagesBox.scrollTop = messagesBox.scrollHeight

})
//message submit
chatMessage.addEventListener('submit',e =>{
    e.preventDefault();
    let  msg  =  e.target.msg.value;
    //emit a msg to the server
    socket.emit('chatMessage',msg);
    //CLEAR input
    e.target.msg.value='';
    e.target.msg.focus()
 })

const outputMessage = msg =>{
    const div = document.createElement('div');
    div.innerHTML =`<p class="meta">${msg.userName} <span>${msg.time}</span></p>${msg.message}<p class="text"></p>`
    div.className = 'message';
    document.querySelector('.chat-messages').appendChild(div)
}