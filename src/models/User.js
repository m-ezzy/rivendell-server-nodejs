import { Schema, model } from 'mongoose';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
      // required: "name is required!",
      required: [true, "name is required!"],
    },
    // username: {
    //   type: String,
    //   min: [1, "username must be at least 1 character"],
    //   max: 100,
    //   required: true,
    //   unique: true,
    // },
    email: {
      type: String,
      min: 5,
      max: 255,
      required: "email is required!",
      unique: true,
    },
    hashedPassword: {
      type: String,
      min: 1,
      max: 1024,
      required: "password is required!",
    },
    salt: {
      type: String,
      required: "salt is required!",
    },
    // avatar: {
    //   type: String,
    //   default: "/assests/images/avatar.png",
    // },
    // created_date: {
    //   type: Date,
    //   default: Date.now,
    //   required: true,
    // },
    chats: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Chat",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.authenticate = function (plainText) {
//   return this.encryptPassword(plainText) === this.hashedPassword;
// };

// export const User = model("User", userSchema);
export const UserModel = model("User", userSchema);
