import models from "./models.js"

let controllers = {}

controllers.checkUsername = async (req, res) => {
	let rows = await models.users.checkUsername(req.body.username)
	res.header('Access-Control-Allow-Origin', '*')
	res.json(rows)
}
controllers.checkPassword = async (req, res) => {
	let rows = await models.users.checkPassWord(req.body.username, req.body.password)
	res.header('Access-Control-Allow-Origin', '*')
	res.json(rows)
}
controllers.signup = async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*')

	let rows = await models.users.checkUsername(req.body.username)
	if(rows.length) {
		res.json({status: 'username not available'})
	} else {
		let user_id = await models.users.insert(req.body.username, req.body.password)
		res.cookie('user_id', user_id, {maxAge: '360000000'})
		res.cookie('username', req.body.username, {maxAge: '360000000'})
		res.json({user_id: user_id, username: req.body.username})
	}
}
controllers.login = async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*')

	let rows = await models.users.checkPassword(req.body.username, req.body.password)
	if (rows.length == 0) {
		res.json({status: 'username not registered'})
	} else {
		res.cookie('user_id', rows[0].user_id, {maxAge: '360000000'})
		res.cookie('username', rows[0].user_name, {maxAge: '360000000'})
		res.json(rows[0])
	}
	// console.log(req.cookies, res.cookie)
	// console.log(res)
	// res.redirect('http://localhost:5173/index.html')
	// spent much time here because i didn't end the request by calling res.json() or res.send() or res.end()
	// so it never closed and the browser never showed any error nor did the server console
}
controllers.createChat = async (req, res) => {
	let rows = await models.users.selectOneUserName(req.body.user_name)
	if(rows.length == 0) {
		res.json({'status': 'username not in database'})
		return
	}
	let chat_id = await models.chats.insert(req.cookies.user_id)
	let rows3 = await models.members.insert(chat_id, req.cookies.user_id)
	let rows4 = await models.members.insert(chat_id, rows[0].user_id)
	res.json({chat_id: chat_id, user_id: rows[0].user_id})
}
controllers.previousChats = async (req, res) => {
	let rows = await models.chats.selectPreviousChats(req.cookies.user_id)
	res.json(rows)
}
controllers.previousMedia = async (req, res) => {
	let rows = await models.media.selectPreviousMedia(req.body.chat_id)
	res.json(rows)
}
controllers.sendMessage = async (req, res) => {
	let rows = await models.media.insert(req.body.chat_id, req.cookies.user_id, 1, req.body.data)

	let rows2 = await models.media.selectPreviousMedia(req.body.chat_id)
	console.log(rows)
	let time = new Date()
	rows2.forEach(r2 => {
		if(r2.media_id == rows.insertId) {
			time = r2.time
		}
	})
	res.json({media_id: rows.insertId, time: time})
}

import path from 'path'
import fs from 'fs'
import mime from 'mime'

let fileTypes = [
	[],
	[],
	['jpg', 'jpeg', 'png'],
	['mp4', 'mkv'],
	['mp3'],
	['pdf', 'doc', 'docx', 'txt', 'html']
]

controllers.sendMediaFiles = async (req, res) => {
	// console.log(req.file)
	// console.log(req.file.path)
	console.log(req.files)
	console.log(req.files.length)
	// console.log(req.body.file)
	// console.log(req.body.file.path)

	// let rows = await models.media.insertFile(req.body.chat_id, req.cookies.user_id, 2, req.file.data)

	let arr = []
	for(let i = 0 ; i < req.files.length ; i++) {
		let extension = (req.files[i].originalname.split('.'))[1]
		// let extension = path.extname(req.file.originalname)

		let type = 0
		for(let j = 0 ; j < fileTypes.length ; j++) {
			for(let k = 0 ; k < fileTypes[j].length ; k++) {
				if(fileTypes[j][k] == extension) {
					type = j
					break
				}
			}
		}
		let rows = await models.media.insert(req.body.chat_id, req.cookies.user_id, type, extension)

		fs.renameSync(req.files[i].path, `./data/${rows.insertId}.${extension}`, (err) => {
			console.log(err)
		})
		/*fs.readFileSync(`./temp/${req.file.path.split('\\')[1]}`, (err, content) => {
			console.log(err, content)
			fs.writeFileSync(`./data/${rows.insertId}.${extension}`, content)
		})*/

		/*let rows2 = await models.media.selectPreviousMedia(req.body.chat_id)
		let time = new Date()
		rows2.forEach(r2 => {
			if(r2.media_id == rows.insertId) {
				time = r2.time
			}
		})*/

		let time = new Date().toLocaleString()
		arr.push({
			media_id: rows.insertId,
			chat_id: req.body.chat_id,
			user_id: req.cookies.user_id,
			type: type,
			time: time,
			data: extension
		})
	}
	// res.json({media_id: rows.insertId, time: time})
	res.send(JSON.stringify(arr))
}
controllers.getMediaData = async (req, res) => {   //getMediaFilesData
	//   /:filename   req.params.image_name   req.params.ext
	console.log(req.params, path.basename(req.url), path.extname(req.url))
	let filePath = process.cwd()
	let filename = path.basename(req.url)
	let extension = path.extname(req.url)

	res.setHeader('Content-Type', mime.getType(extension))
	const stream = fs.createReadStream(process.cwd() + `/data/${req.params.filename}`)
	stream.pipe(res)

	// res.sendFile(process.cwd(), `./data/${filename}`)

	/*fs.readFileSync(`./data/${req.params.image_name}.${req.params.ext}`, {encoding: 'base64'}, (err, content) => {
		console.log(content)
		res.end(content)
	})*/
}
export default controllers
