/* user model */
console.log('server user model -> polls.js loaded');

var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var questionValidator = [
  validate({
    validator: 'isLength',
    arguments: [8, 50],
    message: 'Question should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];
var optionValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Question should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var PollsSchema = new mongoose.Schema({
      question: {
        type: String,
        required: true,
        trim: true,
        validate: questionValidator
      },
     option1: {
        type: String,
        required: true,
        trim: true,
        validate: optionValidator
     },
    option2: {
      type: String,
      required: true,
      trim: true,
      validate: optionValidator
    },
   option3: {
     type: String,
     required: true,
     trim: true,
     validate: optionValidator
   },
  option4: {
     type: String,
     required: true,
     trim: true,
     validate: optionValidator
  },
   option1_votes: {
      type: Number,
      required: true,
      default: 0
   },
   option2_votes: {
      type: Number,
      required: true,
      default: 0
   },
   option3_votes: {
      type: Number,
      required: true,
      default: 0
   },
   option4_votes: {
      type: Number,
      required: true,
      default: 0
   }
  },
  { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} });

  var Poll = mongoose.model('Poll', PollsSchema);
