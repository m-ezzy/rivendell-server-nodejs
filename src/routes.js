import express from 'express'
import controllers from './controllers.js'

import multer from 'multer'
const uploadFile = multer({
	dest: './temp'
})

let router = express.Router()

//router.get("/api/media_image/:image_name/:ext", (req, res) => controllers.getMediaImage(req, res))
router.get("/api/get_media_data/:filename", (req, res) => controllers.getMediaData(req, res))

router.get("/api", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.send("<h1>React and Express</h1>")
})
router.get("/*", (_req, res) => {
  res.json('this is not a route!')
  //res.sendFile(path.join(__dirname, "index.html"))
})

router.post("/api/check_username", (req, res) => controllers.checkUsername(req, res))
router.post("/api/check_password", (req, res) => controllers.checkPassword(req, res))
router.post("/api/signup", (req, res) => controllers.signup(req, res))
router.post("/api/login", (req, res) => controllers.login(req, res))

router.post("/api/create_chat", (req, res) => controllers.createChat(req, res))
router.post("/api/previous_chats", (req, res) => controllers.previousChats(req, res))
router.post("/api/previous_media", (req, res) => controllers.previousMedia(req, res))
router.post("/api/send_message", (req, res) => controllers.sendMessage(req, res))
router.post("/api/send_media/files", uploadFile.array('files', 5), (req, res) => controllers.sendMediaFiles(req, res))

//multer({dest: './data/documents'}).array('files', 5)

export default router
