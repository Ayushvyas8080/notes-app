import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import noteRouter from './routes/note.routes.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

// app instance initialized
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notes', noteRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
