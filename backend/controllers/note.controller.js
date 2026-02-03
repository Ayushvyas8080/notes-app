import mongoose from 'mongoose';
import Note from '../models/note.model.js';
import sendToken from '../utils/sendToken.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      user: req.userId,
    });

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: 'Note not found' });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Title and content are required' });
    }

    const newNotes = await Note.create([{ title, content, user: req.userId }], {
      session,
    });

    const token = req.cookies.token;

    sendToken(res, token);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      data: newNotes[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const deleteNote = async (req, res) => {};
export const updateNote = async (req, res) => {};
