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
})

export default router;