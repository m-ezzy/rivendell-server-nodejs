import { Server as socketServer } from 'socket.io';
import socketAuthentication from './config/socketAuthentication.js';

let onlineUsers = [];

export default io = new socketServer({
  cookie: {
    name: 'connect.sid',
    httpOnly: false,
    sameSite: false,
    secure: false,
  },
  cors: {
    // origin: "*", //when this is written then socket.io admin-ui does not work
    origin: ['http://localhost:5173', 'https://admin.socket.io'],
    methods: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*",
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
  // path: '/sockets/',
  serveClient: true,
  transports: ['websocket', 'polling', 'flashsocket'],
});

io.use(socketAuthentication);

// io.use((socket, next) => {
  // console.log(111111111111111);
  // console.log("socket ID   :", socket.id);
  // console.log("handshake   :", socket.handshake);
  // console.log("session ID  :", socket.request.socket);
  // console.log("socket data :", socket.data);
  // next();
// });

// io.sockets.on('connection', (socket) => {
//   console.log(222222222222222);
//   console.log("socket.id   : ", socket.id);
//   console.log("socket.data : ", socket.data);
// });

io.on('connection', (socket) => {
  socket.use((packet, next) => {
    console.log("event name: ", packet[0]);
    console.log("event data: ", packet[1]);
    next();
  });
  socket.on("connection", (data) => {
    console.log("socket connected!", data);
    // onlineUsers[data.userId] = socket.id;
    onlineUsers.push({ userId: data.userId, socketId: socket.id });
  });
  socket.on('disconnect', (data) => {
    console.log("socket disconnected!", data);
    // onlineUsers[data.userId] = null;
    onlineUsers.splice(onlineUsers.findIndex(user => user.userId == data.userId), 1);
  });
  socket.on('error', (error) => {
    console.log("socket error!", error);
    
    if(error.message === "user is not authenticated!") {
      socket.disconnect();
    }
  });
  socket.on('check-user-online-status', (data) => {
    onlineUsers.forEach(user => {
      if(user.userId == data.userId) {
        io.to('' + user.socketId).emit('user-online-status', { userId: data.userId, status: true });
      }
    });
  });
  // socket.on('connect-to-all-my-chats', (data) => {
  //   console.log(data)
  //   data.forEach(chat_id => {
  //     socket.join(chat_id)
  //   })
  // })
  socket.on('connect-to-chat', (data) => {
    socket.join('' + data.chatId);
  });
  socket.on('new-chat', (data) => {
    socket.join('' + data.chatId);
    io.to('' + data.userId).emit('new-chat', data);
    // socket.to('' + data.userId).emit('new-chat', data);
  });
  socket.on('send-message', (data) => {
    socket.to('' + data.chatId).emit('receive-message', data);
  });
});
