const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {                        // Added email field
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Password hashing before saving
UserSchema.pre('save', async function(next) {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);