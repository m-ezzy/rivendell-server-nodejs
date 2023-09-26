import { Router } from 'express';
import passport from 'passport';

import authController from './controllers/auth.js';
import * as userController from './controllers/user.js';
import * as chatController from './controllers/chat.js';
import * as messageController from './controllers/message.js';

let authRouter = Router();
let userRouter = Router();
let chatRouter = Router();
let messageRouter = Router();
let allRouter = Router()

authRouter
.post("/login", passport.authenticate('local'), authController.login)
.post("/login", authController.login)
.post("/logout", authController.logout)
.post("/isAuthenticated", authController.isAuthenticated);

userRouter
.post("/create", userController.create) //signup
.post("/get", userController.get)
.post("/update", userController.update)
.delete("/delete", userController.deleteUser)
.post("/search", userController.search);

chatRouter
.post("/create", chatController.create)
.post("/previous", chatController.previous);

messageRouter
.post("/create", messageController.create)
.post("/previous", messageController.previous);

allRouter
.use('/auth', authRouter)
.use('/user', userRouter)
.use('/chat', chatRouter)
.use('/message', messageRouter)

.get("/", ( req, res, next ) => {
  res.status(200).json({
		cookies: req.cookies,
		signedCookies: req.signedCookies,
		secret: req.secret,
		sessionID: req.sessionID,
		session: req.session,
		// sessionStore: req.sessionStore,
		user: req.user
	});
})

.use('/*', (req, res, next) => {
	res.status(404).json({ message: 'route not found!' });
});

export default allRouter;
