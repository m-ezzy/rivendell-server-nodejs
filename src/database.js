import mysql from 'mysql'
import util from 'util'

let con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'rivendell',
})

// promise wrapper to enable async await with MYSQL
con.query = util.promisify(con.query).bind(con)

con.connect(function(err) {
	if (err) {
		console.log("error connecting : " + err.stack)
		return
	}
	console.log("database connected : " + con.threadId)
})

export default con
