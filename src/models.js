import db from './database.js'

let models = {
  users: {},
  chats: {},
	members: {},
  media: {}
}

models.users.checkUsername = async (username) => {
	let query = `SELECT user_id,user_name FROM users WHERE user_name='${username}'`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
models.users.checkPassword = async (username, password) => {
	let query = `SELECT user_id,user_name FROM users WHERE user_name='${username}' AND pass_word='${password}'`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
models.users.selectOne = async (user_id) => {
  let query = `SELECT * FROM users WHERE user_id=${user_id}`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows[0]))
}
models.users.selectOneUserName = async (user_name) => {
	let query = `SELECT * FROM users WHERE user_name='${user_name}'`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
models.users.insert = async (user_name, pass_word) => {
	let query = `INSERT INTO users(user_name,pass_word) VALUES('${user_name}','${pass_word}')`
	let rows = await db.query(query).catch(err => { throw err })
	return rows.insertId
}
models.users.update = async (user_id, user_name, pass_word) => {
	let query = `UPDATE users SET user_name='${user_name}',pass_word='${pass_word}' WHERE user_id=${user_id}`
	let rows = await db.query(query).catch(err => { throw err })
	return {'status': 'success'}
}
models.chats.selectPreviousChats = async (user_id) => {
	let query = `SELECT members.chat_id,users.user_id,users.user_name FROM members INNER JOIN users ON members.user_id=users.user_id WHERE members.user_id!=${user_id} AND members.chat_id IN (SELECT chat_id FROM members WHERE user_id=${user_id})`
	let rows = await db.query(query).catch(err => { throw err })

	// let rows2 = []
	// rows = JSON.parse(JSON.stringify(rows))
	// rows.forEach(r => {
	// 	console.log(r)
	// 	if(r.user_id != user_id) {
	// 		rows2.push(r)
	// 	}
	// })
	return JSON.parse(JSON.stringify(rows))
}
models.chats.insert = async (user_id) => {
	let query = `INSERT INTO chats(user_id) VALUES(${user_id})`
	let rows = await db.query(query).catch(err => { throw err })
	return rows.insertId
}
models.members.insert = async (chat_id, user_id) => {
	let query = `INSERT INTO members(chat_id,user_id) VALUES(${chat_id},${user_id})`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
models.members.delete = async (chat_id, user_id) => {
	let query = `DELETE FROM members WHERE chat_id=${chat_id} AND user_id=${user_id}`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
models.media.selectPreviousMedia = async (chat_id) => {
	let query = `SELECT * FROM media WHERE chat_id=${chat_id}`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
models.media.insert = async (chat_id, user_id, type, data) => {
	let query = `INSERT INTO media(chat_id,user_id,type,data) VALUES(${chat_id},${user_id},${type},'${data}')`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
models.media.insertFile = async (chat_id, user_id, type, file) => {
	let query = `INSERT INTO media(chat_id,user_id,type,file) VALUES(${chat_id},${user_id},${type},${file})`
	let rows = await db.query(query).catch(err => { throw err })
	return JSON.parse(JSON.stringify(rows))
}
export default models
