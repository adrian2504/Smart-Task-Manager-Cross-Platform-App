import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  notes: String,
  due: Date,
  done: Boolean,
  category: String,
  imageUrl: String,
});

export default mongoose.model('Task', TaskSchema);
