// @ts-nocheck

import { NextFunction, Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
import { cookieJwtAuth } from '../middlewares/checkAuth';

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
});

// visit a location

router.post('/visitLocation', cookieJwtAuth,async (req, res) => {
    
    try {
        //  add location id to locations section of the user
        // find the target user
        const targetUser = await prisma.user.findFirst({where: {id: req.user.id}});
        const targetLocation = await prisma.locationMap.findFirst({where: {id: req.body.id}});
        if (!targetLocation) res.status(400).json({error: 'target location not found'});
        let locationArray = targetUser?.locations;
        // update the locations array
        locationArray = [...locationArray, targetLocation.id]
        await prisma.user.update({where:{id: targetUser.id}, data:{
            locations: locationArray
        }});
        res.status(200).json({
            message: 'data successfully updated'
        })
    }
    catch(err) {

    }
})
export default router;