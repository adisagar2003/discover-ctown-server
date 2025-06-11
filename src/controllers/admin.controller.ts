import { Request, Response, Router } from "express";
import { checkIfUserIsAdmin } from "../middlewares/checkAuth";

const router: Router = Router();

// checks if the user calling the route is admin
router.get("/admin/get", checkIfUserIsAdmin ,async (req: Request, res: Response) => {
    res.status(200).json({
        
    })
});


export default router;