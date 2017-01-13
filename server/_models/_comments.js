/* comments model */
console.log('server comment model -> comments.js loaded');

var mongoose = require('mongoose');
var validate = require('mongoose-validator');
/* ********** VALIDATIONS ********** */

   var nameValidator = [
     validate({
       validator: 'isLength',
       arguments: [2, 50],
       message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
     })
   ];

   var postValidator = [
     validate({
       validator: 'isLength',
       arguments: [4, 500],
       message: 'Post should be between {ARGS[0]} and {ARGS[1]} characters'
     })
   ];

/* ********** /END VALIDATIONS ********** */

/* ********** MODEL ********** */

   var Schema = mongoose.Schema;

   var CommentSchema = new mongoose.Schema({
      _post: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Post'
      },
     commentby: {
        type: String,
        required: true,
        validate: nameValidator
     },
     content: {
        type: String,
        required: true,
        validate: postValidator
     },
     votes: {
       type: Number,
       default: 0
     },
      comments: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
      }]
   }, {timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}});

   mongoose.model('Comment', CommentSchema);
   var Comment = mongoose.model('Comment');
