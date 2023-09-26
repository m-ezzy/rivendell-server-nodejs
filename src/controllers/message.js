import { ChatModel } from "../models/Chat.js";
import { MessageModel } from "../models/Message.js";

export async function previous (req, res, next) { //selectMessages //getAllMessages //getMessages //fetchMessages //getMessagesByChatId
	// const { from, to } = req.body;
	// const messages = await MessageModel.find({
	// 	users: {
	// 		$all: [from, to],
	// 	},
	// }).sort({ updatedAt: 1 });
	// const projectMessages = messages.map((msg) => {
	// 	return {
	// 		fromSelf: msg.sender.toString() === from,
	// 		message: msg.message.text,
	// 	}
	// });
	// res.json(projectMessages);

	const { chatId } = req.body;
	console.log(chatId);
	ChatModel
	.findById(chatId)
	.populate("messages")
	.then((chat) => {
		res.status(200).json(chat.messages);
	})
	.catch((err) => {
		res.status(500).json({ message: "Failed to fetch messages from DB", err });
	});
}

export const create = async (req, res, next) => { //sendMessage //addMessage //createMessage //insertMessage
	// 2
	// const { chatId, to, text } = req.body;
	// const newMessage = await MessageModel.create({ sender: req.user.id, text });
	// ChatModel.findOneAndUpdate({ _id: chatId }, { $push: { messages: newMessage.id } }, { new: true }, (err, chat) => {});
	// ChatModel.findOneAndUpdate({ users: { $all: [req.user.id, to] } }, { $push: { messages: newMessage.id } }, { new: true }, (err, chat) => {});
	// if(newMessage) {
	// 	return res.json({ message: "Message added successfully!" });
	// } else {
	// 	return res.json({ message: "Failed to add message to DB" });
	// }

	// 3
	// const { text } = req.body;
	// const message = { sender: req.user.id, text }
	// ChatModel.findOneAndUpdate({ _id: chatId }, { $push: { messages: message } }, { new: true }, (err, chat) => {
	// 	if(err) {
	// 		res.json({ message: "Failed to add message to DB" });
	// 	} else {
	// 		res.status(200).json({ message: "Message added successfully!" });
	// 	}
	// });

	// 4
	const { chatId, text } = req.body;
	let message = new MessageModel({ sender: req.user.id, text });
	ChatModel
	.findByIdAndUpdate(chatId, { $push: { messages: message } }, { new: true })
	// .findOneAndUpdate({ _id: chatId }, { $push: { messages: message } }, { new: true })
	.then((chat) => {
		res.status(200).json({ message: "Message added successfully!" });
	})
	.catch((err) => {
		res.status(500).json({ message: "Failed to add message to DB", err });
	});
}

// ways to find chat :
// 1. chatId
// ChatModel.findOneAndUpdate({ _id: chatId }, { $push: { messages: message } }, { new: true }, (err, chat) => {});
// 2. from userId and to userId
// ChatModel.findOneAndUpdate({ users: { $all: [req.user.id, to] } }, { $push: { messages: message } }, { new: true }, (err, chat) => {});

// ways to save messages :
// 1. messageId in chat - chatId sender text
// 2. messageId in chat - sender text
// 3. message in chat without Schema - sender text
// 4. message in chat with Schema    - sender text

// ways to link 2 collections :
// 1. id in schema
// 2. id in array in schema
// 3. schema in schema

// ways to find messages :
// 1. chatId
// 2. from userId and to userId

// ways to create new message :
// 1. const message = await new MessageModel({ sender: req.user.id, text }).save((err, message) => {});
// 2. await MessageModel.create({ sender: req.user.id, text });
