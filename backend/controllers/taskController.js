import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const { title, notes, due, category, done } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const task = await Task.create({
    userId: req.user.id,
    title, notes, due, done, category, imageUrl
  });
  res.json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};
