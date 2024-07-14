import { NextFunction, Request, Response, Router } from 'express';
import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client';
import generateToken from '../utils/token.utils';
const router: Router = Router();
const prisma = new PrismaClient();

/*
Login
*/

router.post('/auth/login', async (req: Request, res: Response) => {
    // login 
    
    try {
        const {username, password} = req.body;
        const targetUser = await prisma.user.findFirstOrThrow({where:{ username: username }});
        if (targetUser.password) {
            const isPasswordCorrect = await bcrypt.compare(password, targetUser.password);
            if (!isPasswordCorrect) {
                throw new Error('incorrect password');
            }
            else {
                // make auth cookie
                const tokenGenerated = generateToken(targetUser.id);
                res.cookie('token', tokenGenerated);
                return res.status(200).json({
                    email: targetUser.email, 
                    username: targetUser.username,
                    token: tokenGenerated
                });
            }
        
        }else {
            throw new Error('Error in user model')
        }
    }
    // check if username exists
    catch (err) {
        res.status(400).json({
            error: "username or password incorrect"
        })
    }
})

export default router;