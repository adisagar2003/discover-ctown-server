import express, { Express, Request, Response } from "express";
import * as cors from 'cors';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes/routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

/* 
App Configuration 
*/

app.use(cors.default());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TS Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});