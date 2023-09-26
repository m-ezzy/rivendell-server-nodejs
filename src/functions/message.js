import Chat from "../models/Chat";
import { MessageModel } from "../models/Message";

export function createMessage({ text, createdAt }) {
	MessageModel.create({ text, createdAt })
	.then((message) => {
		Chat.findOneAndUpdate({ _id: chatId }, { $push: { messages: message } }, { new: true }, (err, chat) => {});
		console.log(message);
		return true;
	})
	.catch((err) => {
		console.log(err);
		return false;
	});
}
