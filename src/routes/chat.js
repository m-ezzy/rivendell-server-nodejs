import { Router } from 'express';
import * as chatController from '../controllers/chat.js';

let chatRouter = Router();

chatRouter.post("/previous", chatController.previous);
chatRouter.post("/create", chatController.create);

export default chatRouter;
