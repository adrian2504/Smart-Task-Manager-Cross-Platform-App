import express from 'express';
import Task from '../models/Task.js';
import { auth } from '../middleware/auth.js';         // ← re-use your JWT auth

const router = express.Router();
router.use(auth);   // everything below is authenticated

// GET /api/tasks  (optionally filter by status or “inbox”)
router.get('/', async (req, res) => {
  const { status } = req.query;
  const q = { workspaceId: req.user.workspaceId };
  if (status) q.status = status;
  const tasks = await Task.find(q).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks
router.post('/', async (req, res) => {
  const task = await Task.create({
    ...req.body,
    workspaceId: req.user.workspaceId,
    createdBy:   req.user._id,
  });
  res.status(201).json(task);
});

// PATCH /api/tasks/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await Task.findOneAndUpdate(
    { _id: id, workspaceId: req.user.workspaceId },
    req.body,
    { new: true },
  );
  res.json(updated);
});

// Share / assign
router.post('/:id/share', async (req, res) => {
  const { id } = req.params;
  const { assigneeIds } = req.body;          // [userId, userId, ...]
  const task = await Task.findOneAndUpdate(
    { _id: id, workspaceId: req.user.workspaceId },
    { $addToSet: { assignees: { $each: assigneeIds } } },
    { new: true },
  );
  res.json(task);
});

export default router;
