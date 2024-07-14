import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import cookies from "cookie-parser";    
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

/* 
App Configuration 
*/
app.use(cookies())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TS Server');
});

app.get('/error', (req: Request, res: Response) => {
    res.status(400).json({
        error: "Internal error occured, cookie bad"
    })
})
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});