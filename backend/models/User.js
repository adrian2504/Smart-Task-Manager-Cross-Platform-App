import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username:   { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true },
  password:   { type: String, required: true },      // bcrypt hash
  avatarUrl:  String,
  bio:        String,

  /* Multi-tenant: every user belongs to exactly one workspace  */
  workspaceId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
});

export default mongoose.model('User', userSchema);
