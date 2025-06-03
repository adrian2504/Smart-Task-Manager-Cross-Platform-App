import express from 'express';
import { createTask, getTasks } from '../controllers/taskController.js';
import { upload } from '../middleware/upload.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);
router.post('/', upload.single('image'), createTask);
router.get('/', getTasks);
export default router;
