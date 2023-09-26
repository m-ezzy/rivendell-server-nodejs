import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
// import chatRouter from './chat.js';
// import mediaRouter from './message.js';

let allRouter = Router();

allRouter.use('/auth', authRouter);
allRouter.use('/user', userRouter);
// allRouter.use('/chat', chatRouter);
// allRouter.use('/media', mediaRouter);

// allRouter.get("/*", ( req, res, next ) => {
//   console.log("-----------------------------------", req.sessionID, req.session, req.sessionStore, req.signedCookies, req.user);
//   res.status(404).json('this is not a route!');
// });

export default allRouter;
