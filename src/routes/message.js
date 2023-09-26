import { Router } from 'express';
import { previous, create } from '../controllers/message.js';

export default Router()
.post("/previous", previous)
.post("/create", create);
