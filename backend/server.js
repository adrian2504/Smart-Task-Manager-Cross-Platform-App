// backend/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

// ─── Import only the routes that actually exist ──────────────────────────────
// (Make sure these files are present in `backend/routes/`!)
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/tasks.js';

// If/when you create these route‐files, you can uncomment them:
// import messageRoutes   from './routes/messageRoutes.js';
// import userRoutes      from './routes/userRoutes.js';
// import workspaceRoutes from './routes/workspaceRoutes.js';

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// If you ever add file‐uploads (images, attachments), you can serve them statically.
// For now we’ll leave this commented out:
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ─── Mount “public” routes (no auth required) ─────────────────────────────────
app.use('/api/auth', authRoutes);

// ─── Mount “protected” routes (after you implement a JWT or session middleware) ─
app.use('/api/tasks', taskRoutes);

// Later, once you create these files, un‐comment them:
// app.use('/api/messages', messageRoutes);
// app.use('/api/users',    userRoutes);
// app.use('/api/workspaces', workspaceRoutes);

// ─── Health Check Endpoint (optional) ─────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK' });
});

// ─── Connect to MongoDB & Start Listening ──────────────────────────────────────
const PORT = process.env.PORT || 5005;
const MONGO = process.env.MONGO_URI;

mongoose
  .connect(MONGO)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
