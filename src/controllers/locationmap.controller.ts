// DEVELOPMENT PURPOSES ONLY 
import { PrismaClient } from "@prisma/client";
import { Router } from "express"
import LocationData from "../data/places.json";
const router: Router = Router();

const prisma = new PrismaClient();

// get all locations
router.get('/locationMap/:count', async (req, res) => {
    const locationMaps = await prisma.locationMap.findMany({skip: 0, take: Number(req.params.count)});
    res.status(200).json({
        data: locationMaps
    })
});

// get location in terms of search param
router.get('/locationMapSearch/:name', async (req, res) => { 
    const locationMaps = await prisma.locationMap.findMany({where:{properties:{
        path: ['name'], string_contains:req.params.name
    }},
    take: 10,
    skip: 0
});

    if (!locationMaps) return res.status(200).json({error: 'No locations found'});

    res.status(200).json({
        response: locationMaps
    })

})

export default router;