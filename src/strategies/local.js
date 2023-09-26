import crypto from 'crypto';
import passport from 'passport';
import passportLocal from 'passport-local';
import { UserModel } from '../models/User.js';

const passportLocalStrategy = new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password',
}, verify);

function verify (email, password, cb) {
  UserModel
  .findOne({ email })
  .then((user) => {
    console.log(1);
    if (!user) {
      return cb(null, false, { message: "incorrect email" });
    }
    // if(!user.salt || !user.hashedPassword) {
    //   return cb(null, false, { message: "incorrect password" });
    // }

    // if(!user.authenticate(password)) {
    //   return cb(null, false, { message: 'incorrect password' });
    // }

    let hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256').toString("base64");
    if(user.hashedPassword != hashedPassword) {
      return cb(null, false, { message: 'incorrect password' });
    }
    console.log(3);
    return cb(null, user);
  })
  .catch((err) => {
    return cb(err);
  });
}

export default passportLocalStrategy;
