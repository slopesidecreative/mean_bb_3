
console.log('POLLS controller loading...');

var mongoose   =  require('mongoose');
var moment     =  require('moment');

var Users      =  mongoose.model('User');

module.exports = {
// "/dashboard"
// Index - show all
index: function (req, res){
   console.log('USER->INDEX');
   Users.find({}, function(err, data) {
      //console.log('DB returned: ',data);
      if(err){
         console.log('Server error! Could not fetch data!');
         res.json({
                 errors: {
                     users: {
                         message: "Server error! Could not fetch data!",
                         kind: "what didn't work",
                         path: "reference to the schema's name",
                         value: "cause of the initial error"
                     }
                 },
                 name: "Server error"
             });
      }else{
         //console.log('success: ',data);
         res.json(data);
      }
   })
},
create: function(req,res){
   console.log('Create POLL: ',req.body);
   var poll = new Polls(req.body);
   console.log('About to save: ', poll);
   poll.save(function(err,newpoll){
      if(err){
         console.log('error',err);
         //res.render('index', {title: 'you have errors!', errors: post.errors})
         res.json({
               errors: {
                    users: {
                        message: "Could not create poll!",
                        kind: "what didn't work",
                        path: "reference to the schema's name",
                        value: "cause of the initial error"
                    }
               },
               name: "Server error"
            });
      }else{
         console.log('YEAH! POLL: ',newpoll);
         res.json(newpoll);
      }
   })
},
//,


/*
   GET /users/:id
   Show - view a single user by ID.
*/
// show: function (req, res){
//    console.log('USER->SHOW');
//    Users.findOne(
//       {
//          _id: req.params.id
//       },
//       function(err, data) {
//          if(err){
//             console.log('server error! user not found!');
//             res.json({
//                     errors: {
//                         users: {
//                             message: "User not found!",
//                             kind: "what didn't work",
//                             path: "reference to the schema's name",
//                             value: "cause of the initial error"
//                         }
//                     },
//                     name: "Server error"
//                 });
//          }else{
//             console.log('db found user: ',data);
//             res.json(data);
//          }
//    })
// },
/* POST
   /users
   Create a new user based on form submission.
*/
// create: function (req, res){
//    console.log('SERVER: USER->CREATE IN PROGRESS....');
//
//    var bday_valid = false;
//    var pw_valid = false;
//    var bdaystr = req.body.birthday;
//    var pwstr = req.body.password;
//    var bday_re = '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])';
//    var pwre = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
//
//    // BIRTHDAY VALIDATION
//    bday_valid = bdaystr.match(bday_re);
//    console.log('birthday valid? ',bday_valid);
//    // PASSWORDS validation
//    if(req.body.password && req.body.password_verify){
//       if(req.body.password === req.body.password_verify){
//          pw_valid = pwstr.match(pwre);
//          console.log('password string match? ', pw_valid);
//       }
//    }
//    // note: password is encrypted in the factory
//    if(!pw_valid){
//       console.log('error - password error!');
//       res.json({
//               errors: {
//                   users: {
//                       message: "Passwords either wrong format or not the same!",
//                       kind: "what didn't work",
//                       path: "reference to the schema's name",
//                       value: "cause of the initial error"
//                   }
//               },
//               name: "Validation error"
//           });
//        }else if (!bday_valid) {
//           //console.log('error - birthday invalid');
//           res.json({
//                   errors: {
//                       users: {
//                           message: "Invalid birthday!",
//                           kind: "what didn't work",
//                           path: "reference to the schema's name",
//                           value: "cause of the initial error"
//                       }
//                   },
//                   name: "Validation error"
//               });
//    }else{
//       var user = new Users({
//           first_name: req.body.first_name,
//           last_name: req.body.last_name,
//           birthday: req.body.birthday,
//           password: req.body.password,
//           password_verify: req.body.password_verify,
//           email: req.body.email
//       });
//       //console.log('new user to attempt to create: ', user);
//       user.save(function(err,newUser){
//          if(err){
//             //console.log('Server error: User not saved!');
//             res.json(err);
//          }else{
//             //console.log('New USER Added to db!', newUser);
//             // 'login' the new user
//             req.session.user = newUser;
//             req.session.save();
//             res.json(newUser);
//          }
//       })
//    }
// },
// delete: function (req, res){
//    console.log('SERVER: POLL->DESTROY');
//    Users.remove(
//       {
//          _id: req.params.id
//       },
//       function(err, data) {
//          if(err){
//             console.log('error ${err}');
//             res.json({
//                    errors: {
//                         users: {
//                             message: "Could not delete user!",
//                             kind: "what didn't work",
//                             path: "reference to the schema's name",
//                             value: "cause of the initial error"
//                         }
//                    },
//                    name: "Server error"
//                 });
//          }else{
//             res.json({"message": "user deleted"});
//          }
//    })
// }

} // exports
