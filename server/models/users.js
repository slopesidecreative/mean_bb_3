/* user model */
console.log('server user model -> users.js loaded');

var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var bcrypt   = require('bcryptjs');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlpha',
    passIfEmpty: true, // does not mean can be empty
    message: 'Name should contain alpha-numeric characters only'
  })
];
// must be a string not as date object
var dateValidator = [
   validate({
      validator: 'isDate',
      message: 'Must be a valid date'
   })
];
var emailValidator = [
   validate({
      validator: 'isEmail',
      message: 'Must be a valid email address'
   })
];
// two strings are the same
var passwordValidator = [
  validate({
  validator: 'matches',
  arguments: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
  message: 'Password does not meet requirements'
   })
];
// password regex -> Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character

// iso date regex
// (?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))

var UserSchema = new mongoose.Schema({
      first_name: {
        type: String,
        required: true,
        trim: true,
        validate: nameValidator
      },
     last_name: {
        type: String,
        required: true,
        trim: true,
        validate: nameValidator
     },
     birthday: {
        type: Date,
        required: true,
        validate: dateValidator
     },
     email: {
       type: String,
       required: true,
       trim: true,
       unique: true,
       validate: emailValidator
     },
     password: {
       type: String,
       required: true,
       trim: true,
       validate: passwordValidator
    }
  },
  { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} });

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function(done) {
      this.password = this.generateHash(this.password);
      this.email = this.email.toLowerCase();
      console.log('do some PRE SAVE stuff');
      done();
  });

  var User = mongoose.model('User', UserSchema);
