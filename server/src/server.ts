import express from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import userRouter from './router/userRouter.js';
import { errorHandle, notFound } from './middleware/errorHanler';

const localHostURl = process.env.localhostUR as string
const liveURL = process.env.liveURL as string

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 4000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

const corsOptions: CorsOptions = {
    origin: [localHostURl, liveURL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/', userRouter);

app.use('*', notFound);
app.use(errorHandle);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
