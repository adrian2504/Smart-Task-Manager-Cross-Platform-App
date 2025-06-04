import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text:        { type: String, required: true },
  from:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // DM
  createdAt:   { type: Date, default: Date.now },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
});

export default mongoose.model('Message', messageSchema);
