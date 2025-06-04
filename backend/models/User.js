// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  // We store the bcrypt hash in `password`
  password: {
    type: String,
    required: true,
  },
});

// If you had earlier stored the hash in `passwordHash` instead,
// rename that field or add an alias, but this sample matches your database.
export default mongoose.model("User", userSchema);
