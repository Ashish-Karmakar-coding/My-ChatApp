import express from 'express';
import {signup ,
        login,
        logout ,
        updateProfile,
        checkUser } from '../controllers/user.controler.js';
import {tokenCheck}  from '../middleware/tokenCheck.middleware.js';

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.get("/logout",logout)

router.put("/update-profile",tokenCheck,updateProfile)

router.get("/check-user",tokenCheck,checkUser)

export default router;