import { NextFunction, Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";

const router: Router = Router();
const prisma = new PrismaClient();
/*
Get users, delete user by id, get user by id
*/

router.get('/user', async (req: Request, res: Response) => {
    // Get all users from prisma 
    const users = await prisma.user.findMany();    
    try {
        res.status(200).json({
           users: users
        });
    }
    catch (err) {
        res.status(400).json({
            error: err
        })
    }
});

// Register user
router.post('/user', async (req: Request, res:Response) => {

    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        
        const userData = {
            username: req.body.username,
            profilePicture: req.body.profilePicture,
            email: req.body.email,
            password: hashedPass,
            progress: 0,
            createdAt: new Date(),
        }

        const user = await prisma.user.create({
            data: userData
        });

        res.status(200).json(({
            user: user
        }));
    } 
    
    catch (err) {
        throw err;
    }
})
export default router;