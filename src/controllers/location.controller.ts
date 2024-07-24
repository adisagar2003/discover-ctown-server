// @ts-nocheck

import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router:Router = Router();
const prisma = new PrismaClient();

router.get('/location/:count', async (req: Request, res: Response) => {
    // get all users from prisma
    const locations = await prisma.location.findMany({
        take: Number(req.params.count)
    });

    if (locations) {
        res.status(200).json({
            data: locations
        })
    }
});


// ROUTE FOR DEVELOPMENT PURPOSES ONLY ⚠️⚠️⚠️⚠️⚠️⚠️
router.post(
'/location/updateSchema'
, async (req: Request, res: Response) => {
    // get location data to put in 
    // is the token authenticated? 
    const location = await prisma.location.updateMany({
        data: {
            category:"Dining"
        }
    });

    res.status(200).json({
        data: location
    })
})

router.post('/location', async (req: Request, res: Response) => {
    // get location data to put in 
    // is the token authenticated as admin???? ⌚
    try {
        const location = await prisma.location.create({
            data: 
            {title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            longitude: Number(req.body.longitude),
            latitude: Number(req.body.latitude),
            likes: 0,
            category: req.body.category
        }
        });

        res.status(200).json({
                data: location
        })
    
    }

    catch(err) {
        res.status(400).json({
            error: err.message
        })
    }

});


export default router;