import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import authenticatedUser from "../middlewares/authenticatedUser.js";

const messageRouter = express.Router()

messageRouter.post('/send/:id',authenticatedUser, sendMessage)
messageRouter.get('/:id',authenticatedUser, getMessage)

export default messageRouter;