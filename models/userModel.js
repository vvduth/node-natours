const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on SAVE
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
      //select: false
    }
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function(next) {
  // check if the pass has been hased yet
  if (!this.isModified('password')) return next();
  // hash the passwork with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //DElete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  // this run after right after server receive the result and compare the pass
  // this.password can not work cuz after the data sent, the password field is set to selected false
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
  }
  // false mean not change
  return false;
};
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});
const User = mongoose.model('User', userSchema);
module.exports = User;
