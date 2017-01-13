app.controller('userNewController', ['usersFactory','sessionFactory','$location', function(usersFactory, sessionFactory, $location) {

// NOTE: THIS FUNCTIONALITY IS NOW IN THE SESSION CONTROLLER THAT HANDLES THE LOGIN AND REGISTRATION
// ON THE DASHBOARD.HTML PAGE!!
// IF THIS CONTROLLER IS TO BE USED AGAIN along with USERNEW.html
// THE METHODS MUST BE UPDATED BASED ON SESSIONCONTROLLER.JS!!

   var _this = this;
   _this.user = {};

   /* LOCKDOWN + + + + + + + + + + + + + +  */
      _this.cur_user = null;
      sessionFactory.getCurUser(function(data){
         if(typeof(data.data) == 'string'){
             $location.path('/');
            }else{
               _this.cur_user = data;
            }
      });
   /* end LOCKDOWN + + + + + + + + + + + + + +  */

   // _this.addUser = function(){
   //    //console.log('Friend to be created: ',_this.user);
   //    usersFactory.create( _this.user, function newUserCreatedNowRedirect(newUser){
   //       console.log('USER created and recd by new user controller -> redirect coming...', newUser);
   //       // console.log('ERRORS CAUGHT READY TO HANDLE: ',newUser);
   //       if ( newUser.hasOwnProperty('errors') ) {
   //          if ( newUser.hasOwnProperty('users') ) {
   //             // came from server-side controller validations
   //             alert('Create new user failed!' + newUser.errors.users.message);
   //          }else{
   //             // came from server-side mongoose model validations
   //             // TODO: CREATE A LOOP TO OUTPUT SPECIFIC ERRORS
   //             alert('Create new user failed!' + ' Please enter a valid first and last name.');
   //          }
   //          $location.path("/");
   //       }else{
   //          _this.user = {};
   //          $location.path("/users/" + newUser._id);
   //       }
   //    });
   // }

}]);
