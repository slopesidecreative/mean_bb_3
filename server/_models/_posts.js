/* posts model */
console.log('server post model -> posts.js loaded');

var mongoose = require('mongoose');
var validate = require('mongoose-validator');

/* ********** VALIDATIONS *************** */

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only'
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

/* ********** MODELS ******************** */

   var Schema = mongoose.Schema;

   var PostSchema = new mongoose.Schema({
     postedby: {
        type: String,
        required: true
     },
     content: {
        type: String,
        required: true,
        validate: postValidator
     },
     comments: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
      }]
     }, {timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}}
   );

   mongoose.model('Post', PostSchema);
   var Post = mongoose.model('Post');
