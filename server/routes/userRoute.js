import express from 'express';
import { getOtherUsers, login, logout, register } from '../controllers/userController.js';
import authenticatedUser from '../middlewares/authenticatedUser.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.get('/', authenticatedUser ,getOtherUsers)

export default userRouter;