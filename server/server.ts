import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.use(clerkMiddleware())

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live Vikash Bhaiya');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});