import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  comment:     String,
  due:         String,  // "YYYY-MM-DD"
  status:      {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
  },
  category:    String,
  image:       String,        // Data-URL or S3 URL
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignees:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
