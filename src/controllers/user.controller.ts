import { NextFunction, Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client'

const router: Router = Router();
/*
Get users, delete user by id, get user by id
*/

router.get('/', (req: Request, res: Response) => {
    // Get all users from prisma 
    try {
        res.status(200).json({
           users: [] 
        })
    }
    catch (err) {
        res.status(400).json({
            error: err
        })
    }
})