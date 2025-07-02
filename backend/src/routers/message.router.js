import express from 'express';
import { tokenCheck } from '../middleware/tokenCheck.middleware.js';
import {
        getUserForSideBar,
        getMessages
} from '../controllers/message.controller.js';

router = express.Router();

router.get('/users',tokenCheck,getUserForSideBar)
router.get('/:id',tokenCheck,getMessages)

export default router;