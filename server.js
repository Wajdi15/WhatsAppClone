const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const messageDetails = require("./utils/message");
const { saveUser, currentUser,deleteUser,getRoomAndUser} = require("./db/chatappDB");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

const bot = "chat bot";
let id 
//run when client connects
io.on("connection", (socket) => {
  console.log("new user connected");
  id = socket.id
  //join room
  socket.on("joinRoom", ({ username, room }) => {
  
  
    saveUser(id,username,room);
   
   socket.join(room)
   


    //Welcome current user
    socket.emit("message", messageDetails(bot, "welcome to chat room"));
    

    //broadcast when a user connects
    socket.broadcast.to(room).emit(
      "message",
      messageDetails(bot, `${username} has joined the chat`)
    );
    
 
  });

  //listen for chatMessage
  socket.on("chatMessage", async (msg) => {
    let user = await currentUser(id)
      console.log(user);
    io.to(user.room).emit("message", messageDetails(user.username, msg));
  });
  socket.on('disconnect',async () => {
    let user = await deleteUser(id)
    io.to(user.room).emit('message', messageDetails(bot, `${user.username} has left the chat`))
      //get all users in the room
      io.to(room).emit("userInThisRoom",{
        room : room,
        users : await getRoomAndUser(room)
      })
  
  })
});

server.listen(3000, () => {
  console.log("localhost work");
});
