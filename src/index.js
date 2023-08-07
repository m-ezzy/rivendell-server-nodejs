import path from 'path'
import url from 'url'
import http from 'http'
import express from 'express'
// import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { Server } from 'socket.io'
import { instrument } from "@socket.io/admin-ui"
// const socketio = require('socket.io')

import routes from './routes.js'
import sockets from './sockets.js'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8000;

console.log(import.meta.url)
console.log(__filename, process.cwd())

const app = express()
const server = http.createServer(app)
let io = new Server(server, {
  serveClient: true,
  cors: {
    // origin: "*", //when this is written then socket.io admin-ui does not work
    origin: ['http://localhost:5173', 'https://admin.socket.io'],
    methods: "*",
    // methods: ["GET", "POST"],
    allowedHeaders: "*",
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  }
})

instrument(io, {
  auth: false
})

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on("connection", (data) => {
    console.log(data)
    // online[data.user_id] = socket.id
  })
  socket.on('disconnect', function (data) {
    console.log(data)
    // online[data.user_id] = null
  })
  socket.on('connect-to-all-my-chats', (data) => {
    console.log(data)
    data.forEach(chat_id => {
      socket.join(chat_id)
    })
  })
  socket.on('connect-to-chat', (data) => {
    console.log(data)
    socket.join('' + data.chat_id)
  })
  socket.on('send-media-message', (data) => {
    console.log(data)
    socket.to('' + data.chat_id).emit('receive-media-message', data)
  })
})

// console.log(io)

// sockets(io)

//app.use("/", express.static(path.join(__dirname, "public")))

// app.use(cors())

// console.log(req.cookies) without using folowing line
app.use(cookieParser())

// see if below methods works
// app.use(express.cookieParser())
// app.use(express.json())

app.use(bodyParser.text({type: '/'}))

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

server.listen(port, () => {
  console.log(`server app running on port ${port}`)
})
