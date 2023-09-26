import { Router } from 'express';
import { create, update, deleteUser } from '../controllers/user.js';

export default Router()
.post("/create", create)
.post("/update", update)
.post("/delete", deleteUser);
