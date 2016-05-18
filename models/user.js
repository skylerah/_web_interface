//jshint esversion: 6

const mongoose = require('mongoose'),
bcrypt = require('bcrypt-nodejs');


console.log('got the user');

var userSchema = mongoose.Schema({
  email: String,
  password: String,
  characters: {type: mongoose.Schema.Types.ObjectId, ref: 'Character'}
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
