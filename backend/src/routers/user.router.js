import express from 'express';
import {signup , signin, signout} from '../controllers/user.controler.js';

const router = express.Router();

router.get("/signup",signup)
router.get("/login",signin)
router.get("/logout",signout)

export default router;