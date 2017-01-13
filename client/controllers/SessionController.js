app.controller('sessionController', function($scope, sessionFactory, usersFactory, $location){
   // the logged in user
   $scope.cur_user = null;
   // the new user to create from registration form
   $scope.user = {};
   // track errors
   $scope.errors = [];

   // set age requirement
   $scope.ageRequirement = moment().subtract(18, "years").format('YYYY-MM-DD');
   console.log('ageRequirement',$scope.ageRequirement);



/* LOCKDOWN + + + + + + + + + + + + + + +  */

    $scope.login = function(){
        sessionFactory.login($scope.loginUser,
           function(data){
             console.log("Client session controller recieved back: ",data);
             if (data.data.errors){
               $scope.errors = data.data.errors;
               alert('Login failed! ' + data.data.errors.login_reg.message);
             }else{
               $scope.user = data.data;
             }
             if(data.data.status){
                     $location.url('/dashboard');
              }
           }
        )
    }

    $scope.addUser = function(){
       $scope.errors = [];
       usersFactory.create( $scope.user, function newUserCreatedNowRedirect(newUser){
          //console.log('USER created and recd by new user controller -> redirect coming...', newUser);

          // HANDLE ERRORS
          // - check for email already in use
          if ( newUser.hasOwnProperty('code') ) {
             $scope.errors.push('This email address is already in use.');
          }
          // - check for all other validations
          if ( newUser.hasOwnProperty('errors') ) {
               for (var key in newUser.errors) {
                  if (newUser.errors.hasOwnProperty(key)) {
                     var obj = newUser.errors[key];
                     for (var prop in obj) {
                        if (obj.hasOwnProperty(prop) && prop == 'message') {
                            //alert(obj[prop]);
                            console.log(obj[prop]);
                            $scope.errors.push(obj[prop]);
                        }
                     }
                  }
               }
          }
          console.log('new user errors: ',$scope.errors);
          // - if no errors, the user has been created
          if($scope.errors.length == 0){
             $scope.user = {};
             $location.path("/");
          }
       });
    }
});
