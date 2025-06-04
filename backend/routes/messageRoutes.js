import express from 'express';
import Message from '../models/Message.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
router.use(auth);

// GET inbox (messages addressed to me OR system broadcast)
router.get('/', async (req, res) => {
  const msgs = await Message.find({
    workspaceId: req.user.workspaceId,
    to: req.user._id,
  }).sort({ createdAt: -1 });
  res.json(msgs);
});

// POST send message
router.post('/', async (req, res) => {
  const { text, to } = req.body;
  const msg = await Message.create({
    text,
    from: req.user._id,
    to,
    workspaceId: req.user.workspaceId,
  });
  res.status(201).json(msg);
});

// … you can add websockets later for real-time
export default router;
