var mongoose = require('mongoose');
var User = mongoose.model('User')

module.exports = (function(){
    return {

      login: function(req, res) {
        User.findOne({
            email: req.body.email
        }, function(err, data) {
            if (err) {
               console.log('LOGIN EMAIL FAIL!');
                res.json({
                        errors: {
                            login_reg: {
                                message: "User name and/or password is invalid!",
                                kind: "what didn't work",
                                path: "reference to the schema's name",
                                value: "cause of the initial error"
                            }
                        },
                        name: "Validation error"
                    }
                );
            } else if (data && data.validPassword(req.body.password)) {
               console.log('LOGIN WINNER!',data,req.sessionID);
               req.session.user = data;
               req.session.save();
               res.json({status: true});
            } else {
               console.log('LOGIN PASSWORD FAIL!');
                res.json({
                        errors: {
                            login_reg: {
                                message: "User name and/or password is invalid!",
                                kind: "what didn't work",
                                path: "reference to the schema's name",
                                value: "cause of the initial error"
                            }
                        },
                        name: "Validation error"
                    });
            }
        })
    },

   getCurUser: function(req, res){
   //   console.log(req.session);
      if(!req.session.user || req.session.user == null){
          //console.log('session curuser not found - this is what you get',null);
          res.send(null)
      }else{
          //console.log('session curuser found! this is what you get: ',req.session.user);
          // returns the _id
          res.send(req.session.user);
      }
   },
   logOut: function(req, res){
      req.session.destroy()
      res.redirect('/#!/');
   }
}
})();
