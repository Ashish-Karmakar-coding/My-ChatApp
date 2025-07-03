import express from 'express';
import { tokenCheck } from '../middleware/tokenCheck.middleware.js';
import {
        getUserForSideBar,
        getMessages, 
        sendMessage
} from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users',tokenCheck,getUserForSideBar)
router.get('/:id',tokenCheck,getMessages)
router.post('/send/:id',tokenCheck,sendMessage)

export default router;