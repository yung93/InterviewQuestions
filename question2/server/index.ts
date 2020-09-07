import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import { connectDB } from "./models";

// configuration ===========================================
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes ==================================================
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Server is running.' });
});
routes(app);

// start app ========================================
// tslint:disable-next-line:no-console
const PORT: number | string = process.env.PORT || 8080;

connectDB();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));