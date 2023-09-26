import mongoose from "mongoose";
import { UserModel } from "./models/User.js";
// import Chat from "./models/Chat.js";
// import Message from "./models/Message.js";

const users = [
	{
		name: "John Doe",
		// username: "johndoe99",
		email: "johndoe99@gmail.com",
		hashedPassword: "123456",
		salt: "123456",
	},
	{
		name: "Mark",
		// username: "mark_1",
		email: "mark1@gmail.com",
		hashedPassword: "12345678",
		salt: "123456",
	},
];
const chats = [];

async function clearDatabase () {
	try {
		// mongoose.connection.dropDatabase();

		// await Message.deleteMany();
		// await Chat.deleteMany();
		await UserModel.deleteMany();
		
		console.log("database cleared");
	} catch (error) {
		console.log(`${error.message}`)
  }
}
async function createStructure () {
	mongoose.connection.db.createCollection("users");
	mongoose.connection.db.createCollection("chats");
	mongoose.connection.db.createCollection("messages");
}
async function populateDatabase () {
	try {
		// mongoose.connection.db.createCollection("users");
		await UserModel.insertMany(users);
    // await Chat.insertMany(chats);
    // await Message.insertMany(messages);

		console.log("sample date loaded in database");
  } catch (error) {
		console.log(`${error.message}`);
  }
}

export { clearDatabase, createStructure, populateDatabase }
