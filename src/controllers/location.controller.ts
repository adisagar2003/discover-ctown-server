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

router.post('/locationMap', async (req: Request, res: Response) => {
    // get location data to put in 
    // is the token authenticated as admin???? ⌚

    /*
{
      "type": "Feature",
      "properties": {
        "name": "Confideration center of Arts",
        "category": "Arts&Culture"
      },
      "geometry": {
        "coordinates": [
          -63.127150985748486,
          46.23431826761407
        ],
        "type": "Point"
      }
    }

    */
    try {
        const location = await prisma.locationMap.create({
            data: 
            {type: req.body.type,
            properties: req.body.properties,
            geometry: req.body.geometry,
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