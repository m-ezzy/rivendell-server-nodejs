import { Schema, model } from "mongoose";

export const messageSchema = Schema( // message //media
	{
		// chatId: {
		// 	type: Schema.Types.ObjectId,
		// 	required: true,
		// 	ref: "Chat",
		// },
		sender: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		// receiver: {
		// 	type: Schema.Types.ObjectId,
		// 	required: true,
		// 	ref: "User",
		// },
		text: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 1000,
		},
		seenAt: {
			type: Date,
			default: null,
			required: false,
		},
	},
	{
  	timestamps: true,
	}
);

export const MessageModel = model("Message", messageSchema);
