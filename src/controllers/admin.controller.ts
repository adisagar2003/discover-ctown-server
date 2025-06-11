import { Request, response, Response, Router } from "express";
import { checkIfUserIsAdmin } from "../middlewares/checkAuth";

const router: Router = Router();

// checks if the user calling the route is admin
router.get("/admin", checkIfUserIsAdmin ,async (req: Request, res: Response) => {
    res.status(200).json({
        response: "Success, admin rights found"
    })
});


export default router;