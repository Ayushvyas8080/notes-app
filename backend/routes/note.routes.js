import { Router } from 'express';
import {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} from '../controllers/note.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const noteRouter = Router();

noteRouter.use(authMiddleware);

noteRouter.get('/', getAllNotes);

noteRouter.get('/:id', getNote);

noteRouter.post('/note', createNote);

noteRouter.delete('/:id', deleteNote);

noteRouter.put('/:id', updateNote);

export default noteRouter;
