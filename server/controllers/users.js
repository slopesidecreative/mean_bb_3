/* users controller */
console.log('USERS controller');

var mongoose   =  require('mongoose');
var moment     =  require('moment');

var Users      =  mongoose.model('User');

var dev = true;

module.exports = {
// "/"
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
/*
   GET /users/:id
   Show - view a single user by ID.
*/
show: function (req, res){
   console.log('USER->SHOW');
   Users.findOne(
      {
         _id: req.params.id
      },
      function(err, data) {
         if(err){
            console.log('server error! user not found!');
            res.json({
                    errors: {
                        users: {
                            message: "User not found!",
                            kind: "what didn't work",
                            path: "reference to the schema's name",
                            value: "cause of the initial error"
                        }
                    },
                    name: "Server error"
                });
         }else{
            console.log('db found user: ',data);
            res.json(data);
         }
   })
},
/* POST
   /users
   Create a new user based on form submission.
*/
create: function (req, res){
   console.log('SERVER: USER->CREATE IN PROGRESS....');

   var bday_valid = false;
   var pw_valid = false;
   var bdaystr = req.body.birthday;
   var pwstr = req.body.password;
   var bday_re = '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])';
   var pwre = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

   // BIRTHDAY VALIDATION
   bday_valid = bdaystr.match(bday_re);
   console.log('birthday valid? ',bday_valid);
   // PASSWORDS validation
   if(req.body.password && req.body.password_verify){
      if(req.body.password === req.body.password_verify){
         pw_valid = pwstr.match(pwre);
         console.log('password string match? ', pw_valid);
      }
   }
   // note: password is encrypted in the factory
   if(!pw_valid){
      console.log('error - password error!');
      res.json({
              errors: {
                  users: {
                      message: "Passwords either wrong format or not the same!",
                      kind: "what didn't work",
                      path: "reference to the schema's name",
                      value: "cause of the initial error"
                  }
              },
              name: "Validation error"
          });
       }else if (!bday_valid) {
          //console.log('error - birthday invalid');
          res.json({
                  errors: {
                      users: {
                          message: "Invalid birthday!",
                          kind: "what didn't work",
                          path: "reference to the schema's name",
                          value: "cause of the initial error"
                      }
                  },
                  name: "Validation error"
              });
   }else{
      var user = new Users({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          birthday: req.body.birthday,
          password: req.body.password,
          password_verify: req.body.password_verify,
          email: req.body.email
      });
      //console.log('new user to attempt to create: ', user);
      user.save(function(err,newUser){
         if(err){
            //console.log('Server error: User not saved!');
            res.json(err);
         }else{
            //console.log('New USER Added to db!', newUser);
            // 'login' the new user
            req.session.user = newUser;
            req.session.save();
            res.json(newUser);
         }
      })
   }
},
/*    PUT /friends/:id
//    Process editing a friend by ID.
// */
update: function (req, res){
   console.log('USER->UPDATE - EDIT PROCESSING.....');
   // birthday validation
   var str = req.body.birthday;
   var re = '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])';
   var found = false;
   if(req.body.birthday){
      found = str.match(re);
   }
   if(!found){
      //console.log('Server error! Birthday error!');
      res.json({
             errors: {
                  users: {
                      message: "Invalid date!",
                      kind: "what didn't work",
                      path: "reference to the schema's name",
                      value: "cause of the initial error"
                  }
             },
             name: "Server error"
          });
   }else{
      Users.findOne({_id: req.params.id}, function(err, user){
         //console.log('USERS CONTROLLER: Looking for the user to update! ');
         if(user){
            //console.log('USERS CONTROLLER: Found the user to update! ');
            if(req.body.first_name){
               user.first_name = req.body.first_name;
            }
            if(req.body.last_name){
               user.last_name = req.body.last_name;
            }
            if(req.body.birthday){
               user.birthday = req.body.birthday;
            }
            if(req.body.email){
               user.email = req.body.email;
            }
            if(req.body.password){
               user.password = req.body.password;
            }
            if(req.body.password_verify){
               user.password_verify = req.body.password_verify;
            }
            user.save(function(err,updatedUser){
             //console.log('Updated user!: ',updatedUser);
            if(err){
               //console.log('Server error updating user!');
               res.json({
                      errors: {
                           users: {
                               message: "Could not update user!",
                               kind: "what didn't work",
                               path: "reference to the schema's name",
                               value: "cause of the initial error"
                           }
                      },
                      name: "Server error"
                   });
               }else{
                  res.json(updatedUser);
                  }
            })
         }else{
            console.log('Server errror: did NOT update USER');
            res.json({
                   errors: {
                        users: {
                            message: "Could not update user!",
                            kind: "what didn't work",
                            path: "reference to the schema's name",
                            value: "cause of the initial error"
                        }
                   },
                   name: "Server error"
                });
         }
      })
   }
},
/* DELETE /users/:id
   Process deleting a user by ID.
*/
delete: function (req, res){
   console.log('SERVER: USER->DESTROY');
   Users.remove(
      {
         _id: req.params.id
      },
      function(err, data) {
         if(err){
            console.log('error ${err}');
            res.json({
                   errors: {
                        users: {
                            message: "Could not delete user!",
                            kind: "what didn't work",
                            path: "reference to the schema's name",
                            value: "cause of the initial error"
                        }
                   },
                   name: "Server error"
                });
         }else{
            res.json({"message": "user deleted"});
         }
   })
}

} // exports
