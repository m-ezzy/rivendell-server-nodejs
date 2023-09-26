import { Schema, model } from 'mongoose';
import { messageSchema } from './Message.js';

export const chatSchema = new Schema({ // conversation //chat
	// users: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		required: true,
	// 		ref: 'User'
	// 	}
	// ],

	users: {
		type: Array,
		required: true,
		default: [],
		ref: 'User'
	},

  // firstId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
	// 	ref: 'User'
  // },
  // secondId: {
  //   type: Schema.Types.ObjectId,
  //   required: true
  // },

	// messages: {
	// 	type: Array,
	// 	required: true,
	// 	default: [],
	// 	ref: 'Message'
	// },

	// messages: [
  //   {
  //     content: String,
  //     ofUser: Schema.Types.ObjectId,
  //     time: {
  //       type: Date,
  //       default: Date.now
  //     }
  //   }
  // ],
	
	// if use this then can't have unique id for each message
	// messages: [
	// 	{
	// 		sender: {
	// 			type: Schema.Types.ObjectId,
	// 			required: true,
	// 			ref: 'User'
	// 		},
	// 		text: {
	// 			type: String,
	// 			required: true,
	// 			minlength: 1,
	// 			maxlength: 1000
	// 		},
	// 	}
	// ],

	// messages: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		required: true,
	// 		ref: 'Message'
	// 	}
	// ],

	messages: [messageSchema],

	// lastUpdate: {
  //   type: Date,
  //   default: Date.now
  // },
  // lastMessage: {
  //   type: String,
  //   default: ''
  // },
  // lastSender: {
  //   type: String,
  //   default: ''
  // }
});

export const ChatModel = model('Chat', chatSchema);
