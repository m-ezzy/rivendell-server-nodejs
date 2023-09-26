import crypto from 'crypto';

import passport from 'passport';
import passportLocalStrategy from 'passport-local';

// import mongoose, { model } from 'mongoose';
// const User = mongoose.model('User');
import { UserModel } from '../models/User.js';

const localStrategy = passportLocalStrategy.Strategy;

const generateSalt = () => {
  return crypto.randomBytes(16).toString('base64'); //hex or base64 or base32 or utf8 or ascii or latin1 or binary
}
const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('base64');
}
const verifyPassword = (password, salt, hashedPassword) => {
  return hashPassword(password, salt) === hashedPassword;
}
const checkUsernameAvailability = async (username) => {
  const user = await UserModel.findOne({ username: username });
  return user ? false : true;
}

export async function create (req, res, next) { //signup
  if(req.user) {
    res.status(400).json({ error: "already logged in!" });
    return next();
  }

  const { name, email, password } = req.body;

  console.log(222222222222, req.body);

  const userExists = await UserModel.findOne({ email });
  if(userExists) {
    // throw "user with same email already exist";
    // throw new Error("user with same email already exist");
    // return next(new Error("user with same email already exist"));
    res.status(400).json({ error: "email already registered!" });
    next();
    return;
    // return next();
  }

	const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  // const newUser = new User(req.body);
  let user = new UserModel({ name, email, hashedPassword, salt });
  user.save()
  .then((user) => {
    req.login(user, (err) => {
      if(err) {
        res.status(200).json({ error: err });
        return;
        // return next(err);
      }
      res.status(200).send({ user });
    });
  })
  .catch((err) => {
    // res.status(400).json({ error: err });
    return next(err);
  });
}
export const get = async (req, res, next) => {
  res.json({ user: req.user });
}
export const update = async (req, res, next) => {
  const { name, email, password } = req.body;
}
export const deleteUser = async (req, res, next) => {
  const { email } = req.body;
}
export const search = async (req, res, next) => {
  const { query } = req.body;
  const users = await UserModel.find({ name: { $regex: query, $options: 'i' } });
  res.status(200).json({ users });
}
