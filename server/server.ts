import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerk.js";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";

const app = express();

// Middleware
app.use(cors())


app.post('/api/clerk',express.raw({ type: 'application/json' }), clerkWebhooks)

app.use(express.json());

const port = process.env.PORT || 3000;

app.use(clerkMiddleware())

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live Vikash Bhaiya');
});

app.use('/api/user',userRouter)
app.use('/api/project', projectRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});