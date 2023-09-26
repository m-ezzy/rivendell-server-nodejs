import { UserModel } from '../models/User.js';
import { ChatModel } from '../models/Chat.js';

export const create = async (req, res, next) => {
	ChatModel.create({
		users: [
			req.user.id,
			req.body.userId,
		]
	})
	// .save()
	.then((chat) => {
		UserModel
		.findByIdAndUpdate(req.user.id, { $push: { chats: chat._id } })
		.findByIdAndUpdate(req.body.userId, { $push: { chats: chat._id } });
		res.status(200).json({ chat: chat });
	})
	.catch((err) => {
		return res.status(500).json(err);
	});
}
export const previous = async (req, res, next) => {
	// UserModel
	// .findById(req.user.id)
	// .populate('chats')
	// .then((user) => {
	//	 return res.status(200).json({ chats: user.chats });
	// })
	// .catch((err) => {
	//		return res.status(500).json(err);
	// });
	ChatModel
	.find({ users: req.user.id }, '-messages')
	.populate('users')
	// .populate('messages')
	.then((chats) => {
		// chats = chats.map(chat => {
		// 	chat.user = chat.users.filter(user => user._id != req.user.id);
		// 	console.log(chat);
		// });
		return res.status(200).json({ chats });
	})
	.catch((err) => {
		return res.status(500).json(err);
	});
}
