import express from 'express';
import {signup ,
        login,
        logout ,
        updateProfile } from '../controllers/user.controler.js';
import {tokenCheck}  from '../middleware/tokenCheck.middleware.js';

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.put("/update-profile",tokenCheck,updateProfile)

export default router;