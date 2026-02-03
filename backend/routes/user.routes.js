import { Router } from 'express';

import authMiddleware from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/:id', (req, res) => {
  res.send('Get user details');
});

userRouter.put('/:id', (req, res) => {
  res.send('Update user details');
});

export default userRouter;
